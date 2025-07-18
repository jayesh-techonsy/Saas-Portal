import subprocess
from fastapi import HTTPException

def get_app_list():
    try:
        container_id = "34cea25abe58"  # Replace with your actual container ID
        command = (
            f"docker exec {container_id} bash -c "
            f"\"bench --site frontend list-apps\""
        )
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        
        if result.returncode != 0:
            raise HTTPException(status_code=500, detail=result.stderr)

        lines = result.stdout.strip().split('\n')
        apps = []
        for line in lines:
            parts = line.strip().split()
            if len(parts) >= 3:
                apps.append({
                    "name": parts[0],
                    "version": parts[1],
                    "branch": parts[2]
                })
        return {"apps": apps}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

