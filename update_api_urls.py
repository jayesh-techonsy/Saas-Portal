#!/usr/bin/env python3
"""
Script to update hardcoded localhost URLs in React frontend files
"""
import os
import re
from pathlib import Path

def update_file_urls(file_path):
    """Update localhost URLs in a single file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Check if API_BASE_URL import already exists
        has_api_import = 'import { API_BASE_URL }' in content or 'from "../config/api"' in content
        
        # Replace localhost URLs with API_BASE_URL
        content = re.sub(
            r'"http://localhost:8000(/[^"]*)"',
            r'`${API_BASE_URL}\1`',
            content
        )
        
        # Add import if needed and content was changed
        if not has_api_import and content != original_content:
            # Find the last import statement
            import_lines = []
            other_lines = []
            in_imports = True
            
            for line in content.split('\n'):
                if in_imports and (line.startswith('import ') or line.startswith('from ') or line.strip() == ''):
                    import_lines.append(line)
                else:
                    if in_imports and line.strip():
                        in_imports = False
                    other_lines.append(line)
            
            # Add the API import
            if import_lines:
                import_lines.append('import { API_BASE_URL } from "../config/api";')
                content = '\n'.join(import_lines + other_lines)
        
        # Write back if changed
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated: {file_path}")
            return True
        
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False
    
    return False

def main():
    """Main function to update all React files"""
    frontend_src = Path("frontend/src")
    
    if not frontend_src.exists():
        print("Frontend src directory not found!")
        return
    
    # Find all .jsx and .js files
    files_to_update = []
    for ext in ['*.jsx', '*.js']:
        files_to_update.extend(frontend_src.rglob(ext))
    
    updated_count = 0
    for file_path in files_to_update:
        if update_file_urls(file_path):
            updated_count += 1
    
    print(f"\nUpdated {updated_count} files with API_BASE_URL configuration")

if __name__ == "__main__":
    main()