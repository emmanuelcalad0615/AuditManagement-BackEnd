#!/bin/bash

if ! command -v python3 &> /dev/null
then
    echo "Python3 no está instalado. Instalando..."
    sudo apt update
    sudo apt install python3 python3-pip -y
    echo "Python3 y pip han sido instalados."
else
    echo "Python3 ya está instalado."
fi

if ! command -v pip &> /dev/null
then
    echo "pip no está instalado. Instalando pip..."
    sudo apt install python3-pip -y
    echo "pip ha sido instalado."
else
    echo "pip ya está instalado."
fi
if [ -d "auditoriasVenv" ]; then
    echo "El entorno virtual ya existe. Activando el entorno..."
else
    # Crear el entorno virtual si no existe
    python3 -m venv auditoriasVenv
    echo "Entorno virtual creado con éxito."
fi
source auditoriasVenv/bin/activate
pip install -r requirements.txt
echo "---------------------------------------------------------------------------------------"
echo "✅ Entorno virtual iniciado con éxito."
echo "Backend de Python con SQLAlchemy para MySql por Lenin Ospina Lamprea, MIT License."
echo "▶ Ejecutando: python3 App.py"
python3 App.py