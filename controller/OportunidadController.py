from flask import Blueprint, request
from service.OportunidadService import OportunidadService


oportunidad = Blueprint('oportunidad', __name__)
oportunidadService = OportunidadService()

@oportunidad.route('/getAll', methods=['GET'])
def getAll():
    return oportunidadService.getAll()

@oportunidad.route('/getid/<int:id>', methods=['GET'])
def getid(id):
    return oportunidadService.getId(id)

@oportunidad.route('/getByPlan/<int:id>', methods=['GET'])
def getByPlan(id):
    return oportunidadService.getByPlan(id)

@oportunidad.route('/save', methods=['POST'])
def save():
    return oportunidadService.save(request.get_json())

@oportunidad.route('/update', methods=['PUT'])
def update():
    return oportunidadService.update(request.get_json())

@oportunidad.route('/delete/<int:id>', methods=['DELETE'])
def delete(id):
    return oportunidadService.delete(id)


