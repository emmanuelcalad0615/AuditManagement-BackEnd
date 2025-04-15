from flask import Blueprint, request
from service.DebilidadService import DebilidadService

debilidad = Blueprint('debilidad', __name__)
debilidadService = DebilidadService()

@debilidad.route('/getAll', methods=['GET'])
def getAll():
    return debilidadService.getAll()

@debilidad.route('/getid/<int:id>', methods=['GET'])
def getid(id):
    return debilidadService.getId(id)

@debilidad.route('/save', methods=['POST'])
def save():
    return debilidadService.save(request.get_json())

@debilidad.route('/update', methods=['PUT'])
def update():
    return debilidadService.update(request.get_json())

@debilidad.route('/delete/<int:id>', methods=['DELETE'])
def delete(id):
    return debilidadService.delete(id)
