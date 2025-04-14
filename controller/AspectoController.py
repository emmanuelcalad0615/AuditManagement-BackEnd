from flask import Blueprint, request
from service.AspectoService import AspectoService

aspecto = Blueprint('aspecto', __name__)
aspectoService = AspectoService()

@aspecto.route('/getAll', methods=['GET'])
def getAll():
    return aspectoService.getAll()

@aspecto.route('/getid/<int:id>', methods=['GET'])
def getid(id):
    return aspectoService.getId(id)

@aspecto.route('/save', methods=['POST'])
def save():
    return aspectoService.save(request.get_json())

@aspecto.route('/update', methods=['PUT'])
def update():
    return aspectoService.update(request.get_json())

@aspecto.route('/delete/<int:id>', methods=['DELETE'])
def delete(id):
    return aspectoService.delete(id)
