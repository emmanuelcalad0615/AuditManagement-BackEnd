from flask import Blueprint, request
from service import SectorService


"""
INSTRUCCIONES:
Cambiar todo lo que diga Sector, por el nombre de la nueva clase con la primera en mayuscula. Verificar mayusculas
Cambiar todo lo que diga sector, por el nombre de la nueva clase con todo en minuscula. Verificar minusculas
"""

# clase de modelo: Sector
# nombre variable: sector


# Definir el Blueprint
sector = Blueprint('sector', __name__)
sectorService = SectorService()
@sector.route('/getAll', methods=['GET'])
def getAll():
    return sectorService.getAll()

@sector.route('/getid/<int:id>', methods=['GET'])
def getid(id):
    return sectorService.getId(id)

@sector.route('/save', methods=['POST'])
def save():
    return sectorService.save(request.get_json())

@sector.route('/update', methods=['PUT'])
def update():
    return sectorService.update(request.get_json())

@sector.route('/delete/<int:id>', methods=['DELETE'])
def delete(id):
    return sectorService.delete(id)
