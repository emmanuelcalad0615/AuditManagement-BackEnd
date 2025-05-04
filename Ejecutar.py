import subprocess
import platform

def inicioEjecucion():
    sistema = platform.system()

    if sistema == "Windows":
        subprocess.run(["windows-setup.bat"], shell=True)
    elif sistema == "Linux":
        subprocess.run(["bash", "linux-setup.sh"])
    else:
        print("Sistema no compatible.")