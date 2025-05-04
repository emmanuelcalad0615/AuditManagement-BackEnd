from flask import Blueprint, request
from service.TrabajadorService import TrabajadorService

trabajador = Blueprint('trabajador', __name__)
service = TrabajadorService()

@trabajador.route('/save', methods=['POST'])
def save():
    return service.save(request.json)

@trabajador.route('/delete/<int:id>', methods=['DELETE'])
def delete(id):
    return service.delete(id)

@trabajador.route('/update', methods=['PUT'])
def update():
    return service.update(request.json)

@trabajador.route('/get/<int:id>', methods=['GET'])
def get_id(id):
    return service.getId(id)

@trabajador.route('/getAll', methods=['GET'])
def get_all():
    return service.getAll()
