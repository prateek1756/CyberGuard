import express from 'express';
import fetch from 'node-fetch';
import { z } from 'zod';

const router = express.Router();

// Enhanced URL scanning with multiple APIs
export async function enhancedUrlScan(url: string) {
  const results = await Promise.all([
    virusTotalScan(url),
    urlVoidScan(url),
    safeBrowsingScan(url),
    heuristicScan(url)
  ]);

  // Improved weighted scoring system
  const weights = {
    virusTotal: 0.5,    // Increased weight for most reliable source
    safeBrowsing: 0.3,  // Google's database is very reliable
    heuristic: 0.15,    // Pattern-based analysis
    urlVoid: 0.05       // Reduced weight, often unreliable
  };

  // Calculate weighted average
  const weightedScores = [
    results[0].score * weights.virusTotal,
    results[2].score * weights.safeBrowsing,
    results[3].score * weights.heuristic,
    results[1].score * weights.urlVoid
  ];

  const totalScore = weightedScores.reduce((sum, score) => sum + score, 0);
  const allReasons = results.flatMap(r => r.reasons).filter(r => r.length > 0);
  
  // More accurate verdict thresholds
  let verdict: 'safe' | 'suspicious' | 'danger' = 'safe';
  if (totalScore >= 60) verdict = 'danger';
  else if (totalScore >= 25) verdict = 'suspicious';

  return {
    score: Math.round(totalScore),
    safetyScore: Math.round(100 - totalScore), // Add safety percentage
    verdict,
    reasons: [...new Set(allReasons)],
    details: {
      virusTotal: results[0],
      urlVoid: results[1],
      safeBrowsing: results[2],
      heuristic: results[3]
    }
  };
}

// VirusTotal API integration (v3 API)
async function virusTotalScan(url: string) {
  try {
    const apiKey = process.env.VIRUSTOTAL_API_KEY;
    if (!apiKey) return { score: 0, reasons: ['VirusTotal API not configured'] };

    // Use v3 API - encode URL as base64
    const urlId = Buffer.from(url).toString('base64').replace(/=/g, '');
    
    const response = await fetch(
      `https://www.virustotal.com/api/v3/urls/${urlId}`,
      {
        headers: {
          'x-apikey': apiKey
        }
      }
    );
    
    if (response.status === 404) {
      // URL not found, submit for analysis
      const submitResponse = await fetch('https://www.virustotal.com/api/v3/urls', {
        method: 'POST',
        headers: {
          'x-apikey': apiKey,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `url=${encodeURIComponent(url)}`
      });
      
      if (submitResponse.ok) {
        return { score: 10, reasons: ['URL submitted for analysis - check back later'] };
      }
      return { score: 0, reasons: ['URL not in database'] };
    }
    
    const data = await response.json();
    
    if (data.data && data.data.attributes && data.data.attributes.stats) {
      const stats = data.data.attributes.stats;
      const malicious = stats.malicious || 0;
      const suspicious = stats.suspicious || 0;
      const total = stats.harmless + stats.malicious + stats.suspicious + stats.undetected;
      
      if (total === 0) return { score: 0, reasons: [] };
      
      const threatScore = ((malicious * 2 + suspicious) / total) * 100;
      const reasons = [];
      
      if (malicious > 0) reasons.push(`${malicious} engines detected malware`);
      if (suspicious > 0) reasons.push(`${suspicious} engines flagged as suspicious`);
      
      return {
        score: Math.min(Math.round(threatScore), 100),
        reasons
      };
    }
    
    return { score: 0, reasons: [] };
  } catch (error) {
    console.error('VirusTotal error:', error);
    return { score: 0, reasons: ['VirusTotal scan failed'] };
  }
}

// URLVoid API integration
async function urlVoidScan(url: string) {
  try {
    const apiKey = process.env.URLVOID_API_KEY;
    if (!apiKey) return { score: 0, reasons: ['URLVoid API not configured'] };

    const domain = new URL(url).hostname;
    const response = await fetch(
      `https://api.urlvoid.com/1000/${apiKey}/host/${domain}/`
    );
    
    const data = await response.text();
    
    // Parse XML response (simplified)
    const detections = (data.match(/<detections>(\d+)<\/detections>/) || [])[1];
    const engines = (data.match(/<engines>(\d+)<\/engines>/) || [])[1];
    
    if (detections && engines) {
      const score = (parseInt(detections) / parseInt(engines)) * 100;
      return {
        score: Math.min(score * 1.5, 100),
        reasons: parseInt(detections) > 0 ? [`${detections}/${engines} engines flagged domain`] : []
      };
    }
    
    return { score: 0, reasons: [] };
  } catch (error) {
    return { score: 0, reasons: ['URLVoid scan failed'] };
  }
}

// Google Safe Browsing API
async function safeBrowsingScan(url: string) {
  try {
    const apiKey = process.env.GOOGLE_SAFE_BROWSING_API_KEY;
    if (!apiKey) return { score: 0, reasons: ['Safe Browsing API not configured'] };

    const response = await fetch(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client: {
            clientId: 'cyberguard',
            clientVersion: '1.0'
          },
          threatInfo: {
            threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE'],
            platformTypes: ['ANY_PLATFORM'],
            threatEntryTypes: ['URL'],
            threatEntries: [{ url }]
          }
        })
      }
    );

    const data = await response.json();
    
    if (data.matches && data.matches.length > 0) {
      const threatTypes = data.matches.map((m: any) => m.threatType);
      return {
        score: 90,
        reasons: [`Google flagged as: ${threatTypes.join(', ')}`]
      };
    }
    
    return { score: 0, reasons: [] };
  } catch (error) {
    return { score: 0, reasons: ['Safe Browsing scan failed'] };
  }
}

// Enhanced heuristic analysis with better accuracy
function heuristicScan(url: string) {
  let score = 0;
  const reasons: string[] = [];

  try {
    const urlObj = new URL(url);
    const host = urlObj.hostname.toLowerCase();
    const path = urlObj.pathname + urlObj.search;
    const fullUrl = url.toLowerCase();

    // Protocol check (reduced weight)
    if (urlObj.protocol !== 'https:') {
      score += 10;
      reasons.push('Non-HTTPS protocol');
    }

    // IP address check (high risk)
    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) {
      score += 40;
      reasons.push('IP address instead of domain');
    }

    // Suspicious TLDs (more comprehensive list)
    const suspiciousTlds = ['tk', 'ml', 'ga', 'cf', 'zip', 'mov', 'loan', 'click', 'download', 'work', 'gq'];
    const tld = host.split('.').pop() || '';
    if (suspiciousTlds.includes(tld)) {
      score += 25;
      reasons.push(`Suspicious TLD: .${tld}`);
    }

    // Domain length (more reasonable threshold)
    if (host.length > 40) {
      score += 10;
      reasons.push('Unusually long domain');
    }

    // Subdomain analysis (more lenient)
    const subdomains = host.split('.');
    if (subdomains.length > 5) {
      score += 15;
      reasons.push('Excessive subdomains');
    }

    // Homograph attack detection
    if (/[а-я]|[α-ω]|[\u4e00-\u9fff]/.test(host)) {
      score += 30;
      reasons.push('Contains non-Latin characters (possible homograph)');
    }

    // Brand impersonation (more accurate)
    const brands = ['paypal', 'amazon', 'microsoft', 'google', 'apple', 'facebook', 'netflix', 'instagram'];
    const brandInDomain = brands.find(brand => {
      const regex = new RegExp(`${brand}`, 'i');
      return regex.test(host) && !host.endsWith(`${brand}.com`) && !host.endsWith(`${brand}.org`) && !host === `${brand}.com`;
    });
    if (brandInDomain) {
      score += 35;
      reasons.push(`Possible ${brandInDomain} impersonation`);
    }

    // Suspicious keywords (refined)
    const phishingKeywords = ['secure-', 'verify-', 'update-', 'confirm-', 'account-', 'login-', 'signin-'];
    const hasPhishingKeywords = phishingKeywords.some(keyword => host.includes(keyword));
    if (hasPhishingKeywords) {
      score += 20;
      reasons.push('Contains phishing-related keywords');
    }

    // URL shorteners
    const shorteners = ['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly', 'short.link'];
    if (shorteners.some(shortener => host.includes(shortener))) {
      score += 15; // Reduced as many legitimate services use shorteners
      reasons.push('URL shortener detected');
    }

    // Path analysis (more specific)
    if (path.includes('@') || path.includes('%2540') || path.includes('//')) {
      score += 20;
      reasons.push('Suspicious path characters');
    }

    // Suspicious patterns in full URL
    if (fullUrl.includes('phishing') || fullUrl.includes('scam') || fullUrl.includes('fake')) {
      score += 50;
      reasons.push('Contains suspicious terms');
    }

    // Random string detection (basic)
    const domainParts = host.split('.');
    const mainDomain = domainParts[domainParts.length - 2] || '';
    if (mainDomain.length > 15 && !/[aeiou]/.test(mainDomain)) {
      score += 15;
      reasons.push('Domain appears to be random string');
    }

    return {
      score: Math.min(score, 100),
      reasons
    };
  } catch (error) {
    return {
      score: 30, // Reduced from 60 for malformed URLs
      reasons: ['Malformed URL']
    };
  }
}

// API endpoint
router.post('/scan-url', async (req, res) => {
  try {
    const { url } = z.object({ url: z.string().url() }).parse(req.body);
    
    const result = await enhancedUrlScan(url);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Invalid request'
    });
  }
});

export default router;