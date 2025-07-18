from fastapi import APIRouter, HTTPException
import subprocess
import paramiko

router = APIRouter()

hostname = "ec2-35-154-209-71.ap-south-1.compute.amazonaws.com"
username = "ubuntu"
key_path = "C:/Users/Jayesh/Desktop/data/erpnext.pem"
docker_container = "pwd-backend-1"

@router.get("/{site_id}/apps")
def get_installed_apps(site_id: str):
    list_all_apps_cmd = f"docker exec -i {docker_container} cat /home/frappe/frappe-bench/sites/apps.txt"
    list_site_apps_cmd = f"docker exec -i {docker_container} bench --site {site_id} list-apps"

    try:
        key = paramiko.RSAKey.from_private_key_file(key_path)
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(hostname, username=username, pkey=key)

        stdin_all, stdout_all, stderr_all = ssh.exec_command(list_all_apps_cmd)
        all_apps = stdout_all.read().decode().splitlines()
        all_apps = [a.strip() for a in all_apps if a.strip()]
        err_all = stderr_all.read().decode()

        if err_all:
            return {"error": f"Error reading apps.txt: {err_all}"}

        stdin_site, stdout_site, stderr_site = ssh.exec_command(list_site_apps_cmd)
        site_apps_output = stdout_site.read().decode().splitlines()
        err_site = stderr_site.read().decode()

        if err_site:
            return {"error": f"Error listing site apps: {err_site}"}

        site_apps = [line.split()[0].strip() for line in site_apps_output if line.strip()]
        ssh.close()

        apps_result = [{"name": app, "installed": app in site_apps} for app in all_apps]
        return {"apps": apps_result}

    except Exception as e:
        return {"error": str(e)}

@router.post("/{site_id}/install")
def install_app(site_id: str, app_name: str):
    try:
        hostname = "ec2-13-201-133-33.ap-south-1.compute.amazonaws.com"
        username = "ubuntu"
        key_path = "C:/Users/Jayesh/Desktop/data/erpnext.pem"
        docker_container = "pwd-backend-1"

        key = paramiko.RSAKey.from_private_key_file(key_path)
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(hostname, username=username, pkey=key)

        install_cmd = f"docker exec -i {docker_container} bench --site {site_id} install-app {app_name}"
        migrate_cmd = f"docker exec -i {docker_container} bench --site {site_id} migrate --skip-failing"

        stdin, stdout, stderr = ssh.exec_command(install_cmd)
        install_out, install_err = stdout.read().decode(), stderxr.read().decode()

        if install_err:
            ssh.close()
            raise HTTPException(status_code=500, detail=f"Install error: {install_err.strip()}")

        stdin, stdout, stderr = ssh.exec_command(migrate_cmd)
        migrate_out, migrate_err = stdout.read().decode(), stderr.read().decode()

        ssh.close()

        if migrate_err:
            raise HTTPException(status_code=500, detail=f"Migrate error: {migrate_err.strip()}")

        return {"message": f"App {app_name} installed and migrated on {site_id}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/{site_id}/uninstall")
def uninstall_app(site_id: str, app_name: str):
    try:
        hostname = "ec2-13-201-133-33.ap-south-1.compute.amazonaws.com"
        username = "ubuntu"
        key_path = "C:/Users/Jayesh/Desktop/data/erpnext.pem"
        docker_container = "pwd-backend-1"

        key = paramiko.RSAKey.from_private_key_file(key_path)
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(hostname, username=username, pkey=key)

        # Uninstall command, auto-confirm with echo y
        uninstall_cmd = f"docker exec -i {docker_container} bash -c 'echo y | bench --site {site_id} uninstall-app {app_name}'"
        migrate_cmd = f"docker exec -i {docker_container} bench --site {site_id} migrate --skip-failing"

        stdin, stdout, stderr = ssh.exec_command(uninstall_cmd)
        uninstall_out, uninstall_err = stdout.read().decode(), stderr.read().decode()

        if uninstall_err:
            ssh.close()
            raise HTTPException(status_code=500, detail=f"Uninstall error: {uninstall_err.strip()}")

        stdin, stdout, stderr = ssh.exec_command(migrate_cmd)
        migrate_out, migrate_err = stdout.read().decode(), stderr.read().decode()

        ssh.close()

        if migrate_err:
            raise HTTPException(status_code=500, detail=f"Migrate error: {migrate_err.strip()}")

        return {"message": f"App {app_name} uninstalled and site migrated on {site_id}"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))