#!/usr/bin/env python3
"""
Startup script for Render deployment
This script handles the startup process and ensures proper configuration
"""

import os
import sys
from pathlib import Path

# Add the current directory to Python path
sys.path.insert(0, str(Path(__file__).parent))

def main():
    """Main startup function"""
    try:
        # Load environment variables
        from dotenv import load_dotenv
        load_dotenv()
        
        # Check required environment variables
        required_vars = [
            'SUPABASE_DB_HOST',
            'SUPABASE_DB_PORT', 
            'SUPABASE_DB_NAME',
            'SUPABASE_DB_USER',
            'SUPABASE_DB_PASSWORD'
        ]
        
        missing_vars = [var for var in required_vars if not os.getenv(var)]
        if missing_vars:
            print(f"❌ Missing required environment variables: {missing_vars}")
            sys.exit(1)
        
        # Get port from environment (Render requirement)
        port = int(os.getenv("PORT", 8000))
        host = os.getenv("HOST", "0.0.0.0")
        
        print(f"🚀 Starting Wassal SaaS Backend on {host}:{port}")
        print(f"✅ Environment variables loaded successfully")
        
        # Import and run the FastAPI app
        from main import app
        import uvicorn
        
        uvicorn.run(
            app,
            host=host,
            port=port,
            log_level="info"
        )
        
    except ImportError as e:
        print(f"❌ Import error: {e}")
        print("Make sure all dependencies are installed: pip install -r requirements.txt")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Startup error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 