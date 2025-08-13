#!/usr/bin/env python3
"""
Test script to check database connectivity and environment variables
"""

import os
from dotenv import load_dotenv

def test_environment():
    """Test if environment variables are loaded correctly"""
    print("🔍 Testing Environment Variables...")
    
    # Load environment variables
    load_dotenv()
    
    # Check required variables
    required_vars = {
        'SUPABASE_DB_HOST': os.getenv('SUPABASE_DB_HOST'),
        'SUPABASE_DB_PORT': os.getenv('SUPABASE_DB_PORT'),
        'SUPABASE_DB_NAME': os.getenv('SUPABASE_DB_NAME'),
        'SUPABASE_DB_USER': os.getenv('SUPABASE_DB_USER'),
        'SUPABASE_DB_PASSWORD': os.getenv('SUPABASE_DB_PASSWORD')
    }
    
    print("\n📋 Environment Variables Status:")
    all_good = True
    
    for var_name, var_value in required_vars.items():
        if var_value:
            print(f"✅ {var_name}: {var_value}")
        else:
            print(f"❌ {var_name}: NOT SET")
            all_good = False
    
    if all_good:
        print("\n🎉 All required environment variables are set!")
        
        # Test database connection
        try:
            from db import database, DATABASE_URL
            print(f"\n🔗 Database URL: {DATABASE_URL}")
            print("✅ Database configuration loaded successfully")
        except Exception as e:
            print(f"\n❌ Database configuration error: {e}")
            all_good = False
    else:
        print("\n⚠️  Some environment variables are missing!")
        print("Please create a .env file with the required variables.")
    
    return all_good

def test_database_connection():
    """Test actual database connection"""
    print("\n🔌 Testing Database Connection...")
    
    try:
        import asyncio
        from db import database
        
        async def test_connection():
            try:
                await database.connect()
                print("✅ Database connection successful!")
                
                # Test a simple query
                result = await database.fetch_one("SELECT 1 as test")
                print(f"✅ Test query successful: {result}")
                
                await database.disconnect()
                print("✅ Database disconnection successful!")
                
            except Exception as e:
                print(f"❌ Database connection failed: {e}")
                return False
        
        # Run the async test
        asyncio.run(test_connection())
        
    except Exception as e:
        print(f"❌ Database test failed: {e}")
        return False

if __name__ == "__main__":
    print("🚀 Wassal SaaS Backend - Database Test")
    print("=" * 50)
    
    # Test environment variables
    env_ok = test_environment()
    
    if env_ok:
        # Test database connection
        test_database_connection()
    
    print("\n" + "=" * 50)
    print("🏁 Test completed!") 