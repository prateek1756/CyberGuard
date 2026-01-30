import serverless from "serverless-http";
import { createServer } from '../server/index';

const app = createServer();

// Export handler for Vercel serverless functions
export default serverless(app);
