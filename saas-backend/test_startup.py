#!/usr/bin/env python3
"""
Test startup script for Render deployment
This script tests the startup process without requiring database connection
"""

import os
import sys
from pathlib import Path

def test_startup():
    """Test startup process"""
    try:
        print("🚀 Testing Wassal SaaS Backend Startup...")
        
        # Test 1: Check if we can import main modules
        print("📦 Testing imports...")
        
        # Test basic imports
        import fastapi
        print("✅ FastAPI imported successfully")
        
        import uvicorn
        print("✅ Uvicorn imported successfully")
        
        # Test 2: Check if main.py can be imported
        print("🔍 Testing main.py import...")
        try:
            from main import app
            print("✅ Main app imported successfully")
        except Exception as e:
            print(f"⚠️  Main app import warning: {e}")
            print("This is expected if database is not configured")
        
        # Test 3: Check environment variables
        print("🔧 Testing environment variables...")
        required_vars = [
            'SUPABASE_DB_HOST',
            'SUPABASE_DB_PORT', 
            'SUPABASE_DB_NAME',
            'SUPABASE_DB_USER',
            'SUPABASE_DB_PASSWORD'
        ]
        
        missing_vars = []
        for var in required_vars:
            if not os.getenv(var):
                missing_vars.append(var)
        
        if missing_vars:
            print(f"⚠️  Missing environment variables: {missing_vars}")
            print("This will cause startup to fail in production")
        else:
            print("✅ All required environment variables are set")
        
        # Test 4: Check port configuration
        port = int(os.getenv("PORT", 8000))
        host = os.getenv("HOST", "0.0.0.0")
        print(f"🌐 Server will start on {host}:{port}")
        
        print("\n🎉 Startup test completed successfully!")
        print("If you see warnings above, they need to be fixed for production deployment.")
        
        return True
        
    except Exception as e:
        print(f"❌ Startup test failed: {e}")
        return False

if __name__ == "__main__":
    success = test_startup()
    sys.exit(0 if success else 1)
