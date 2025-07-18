
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




# def get_sites():
#     hostname = "ec2-13-232-42-110.ap-south-1.compute.amazonaws.com"  
#     username = "ubuntu"
#     key_path = "C:/Users/Jayesh/Desktop/data/erpnext.pem"
#     docker_container = "pwd-backend-1"
#     command = f"docker exec {docker_container} ls /home/frappe/frappe-bench/sites"

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
#             return {"error": error}

#         # Filter sites: Only those ending with ".mdm-wassal.shop"
#         sites = [site for site in output if site.endswith(".mdm-wassal.shop")]

#         return {"sites": sites}

#     except Exception as e:
#         return {"error": str(e)}


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


def get_site_apps(data: dict):
    hostname = "ec2-13-201-133-33.ap-south-1.compute.amazonaws.com"  
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


# def get_sites():
#     try:
#         container_id = "34cea25abe58"  # Update this as needed
#         result = subprocess.run(
#             ["docker", "exec", container_id, "ls", "/home/frappe/frappe-bench/sites"],
#             capture_output=True,
#             text=True,
#             check=True
#         )
#         sites = result.stdout.splitlines()
#         return {"sites": sites}
#     except subprocess.CalledProcessError as e:
#         return {"error": f"Failed to fetch sites: {e}\n{e.stderr}"}

# def drop_site(site: str):
#     container_id = "34cea25abe58"  # Update this as needed
#     try:
#         drop_cmd = (
#             f"docker exec {container_id} bash -c "
#             f"\"echo 'admin' | bench drop-site {site} --force --no-backup --root-password admin\""
#         )
#         result = subprocess.run(drop_cmd, shell=True, capture_output=True, text=True)
#         if result.returncode == 0:
#             return {"message": f"Site '{site}' dropped successfully."}
#         else:
#             return {"error": f"Failed to drop site: {result.stderr}"}
#     except Exception as e:
#         return {"error": str(e)}
