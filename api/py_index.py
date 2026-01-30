import sys
import os

# Add the python directory to sys.path so imports work correctly
sys.path.append(os.path.join(os.path.dirname(__file__), '../python'))

from api_server import app

# Vercel expects a 'handler' or 'app' variable.
# Flask's 'app' is WSGI compatible and can be used directly by Vercel.
handler = app
