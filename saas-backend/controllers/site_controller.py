
from fastapi import HTTPException
import paramiko
import subprocess
import psycopg2
import os
from urllib.parse import unquote

def get_sites():
    try:
        # Decode the password if it's URL-encoded
        db_password = unquote(os.getenv("SUPABASE_DB_PASSWORD", ""))
        
        # Connect to Supabase Postgres
        conn = psycopg2.connect(
            host=os.getenv("SUPABASE_DB_HOST"),
            port=os.getenv("SUPABASE_DB_PORT"),
            dbname=os.getenv("SUPABASE_DB_NAME"),
            user=os.getenv("SUPABASE_DB_USER"),
            password=db_password
        )

        cursor = conn.cursor()
        cursor.execute("SELECT site_name FROM tenants WHERE is_assigned = TRUE;")
        rows = cursor.fetchall()

        assigned_sites = [row[0] for row in rows]

        cursor.close()
        conn.close()

        return {"sites": assigned_sites}

    except Exception as e:
        return {"error": str(e)}

def drop_site(site: str):
    hostname = "ec2-13-201-133-33.ap-south-1.compute.amazonaws.com"  
    username = "ubuntu"
    key_path = "C:/Users/Jayesh/Desktop/data/erpnext.pem"
    docker_container = "pwd-backend-1"
    command = (
        f"docker exec {docker_container} bash -c "
        f"\"echo 'admin' | bench drop-site {site} --force --no-backup --root-password admin\""
    )

    try:
        key = paramiko.RSAKey.from_private_key_file(key_path)
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(hostname, username=username, pkey=key)

        stdin, stdout, stderr = ssh.exec_command(command)
        output = stdout.read().decode()
        error = stderr.read().decode()

        ssh.close()

        if "dropped successfully" in output:
            return {"message": f"Site '{site}' dropped successfully."}
        elif error:
            return {"error": error}
        else:
            return {"output": output}

    except Exception as e:
        return {"error": str(e)}


# SSH_HOSTNAME=ec2-3-111-57-206.ap-south-1.compute.amazonaws.com


def get_site_apps(data: dict):
    hostname = "ec2-3-111-57-206.ap-south-1.compute.amazonaws.com"  
    username = "ubuntu"
    key_path = "C:/Users/Jayesh/Desktop/data/erpnext.pem"
    docker_container = "pwd-backend-1"

    site = data.get("site")
    if not site:
        raise HTTPException(status_code=400, detail="Site is required")

    # This command will run inside the docker container
    command = f"docker exec -i {docker_container} bench --site {site} list-apps"

    try:
        key = paramiko.RSAKey.from_private_key_file(key_path)
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(hostname, username=username, pkey=key)

        stdin, stdout, stderr = ssh.exec_command(command)
        output = stdout.read().decode().splitlines()
        error = stderr.read().decode()

        ssh.close()

        if error:
            raise HTTPException(status_code=500, detail=error)

        return {"apps": output}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# from fastapi import HTTPException
# import paramiko
# import psycopg2
# import os
# from urllib.parse import unquote
# from settings import settings  # ✅ Import settings from your centralized config


# def get_sites():
#     try:
#         db_password = unquote(settings.SUPABASE_DB_PASSWORD)

#         # Connect to Supabase Postgres
#         conn = psycopg2.connect(
#             host=settings.SUPABASE_DB_HOST,
#             port=settings.SUPABASE_DB_PORT,
#             dbname=settings.SUPABASE_DB_NAME,
#             user=settings.SUPABASE_DB_USER,
#             password=db_password
#         )

#         cursor = conn.cursor()
#         cursor.execute("SELECT site_name FROM tenants WHERE is_assigned = TRUE;")
#         rows = cursor.fetchall()

#         assigned_sites = [row[0] for row in rows]

#         cursor.close()
#         conn.close()

#         return {"sites": assigned_sites}

#     except Exception as e:
#         return {"error": str(e)}


# def drop_site(site: str):
#     hostname = settings.SSH_HOSTNAME
#     username = settings.SSH_USERNAME
#     key_path = settings.SSH_KEY_PATH
#     docker_container = settings.DOCKER_CONTAINER_NAME

#     command = (
#         f"docker exec {docker_container} bash -c "
#         f"\"echo 'admin' | bench drop-site {site} --force --no-backup --root-password admin\""
#     )

#     try:
#         key = paramiko.RSAKey.from_private_key_file(key_path)
#         ssh = paramiko.SSHClient()
#         ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
#         ssh.connect(hostname, username=username, pkey=key)

#         stdin, stdout, stderr = ssh.exec_command(command)
#         output = stdout.read().decode()
#         error = stderr.read().decode()

#         ssh.close()

#         if "dropped successfully" in output:
#             return {"message": f"Site '{site}' dropped successfully."}
#         elif error:
#             return {"error": error}
#         else:
#             return {"output": output}

#     except Exception as e:
#         return {"error": str(e)}


# def get_site_apps(data: dict):
#     hostname = settings.SSH_HOSTNAME
#     username = settings.SSH_USERNAME
#     key_path = settings.SSH_KEY_PATH
#     docker_container = settings.DOCKER_CONTAINER_NAME

#     site = data.get("site")
#     if not site:
#         raise HTTPException(status_code=400, detail="Site is required")

#     command = f"docker exec -i {docker_container} bench --site {site} list-apps"

#     try:
#         key = paramiko.RSAKey.from_private_key_file(key_path)
#         ssh = paramiko.SSHClient()
#         ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
#         ssh.connect(hostname, username=username, pkey=key)

#         stdin, stdout, stderr = ssh.exec_command(command)
#         output = stdout.read().decode().splitlines()
#         error = stderr.read().decode()

#         ssh.close()

#         if error:
#             raise HTTPException(status_code=500, detail=error)

#         return {"apps": output}

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
