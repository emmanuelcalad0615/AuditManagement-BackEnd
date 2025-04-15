from flask import Blueprint, request
from service.CompromisoService import CompromisoService


compromiso = Blueprint('compromiso', __name__)
compromisoService = CompromisoService()

@compromiso.route('/getAll', methods=['GET'])
def getAll():
    return compromisoService.getAll()

@compromiso.route('/getid/<int:id>', methods=['GET'])
def getid(id):
    return compromisoService.getId(id)

@compromiso.route('/save', methods=['POST'])
def save():
    return compromisoService.save(request.get_json())

@compromiso.route('/update', methods=['PUT'])
def update():
    return compromisoService.update(request.get_json())

@compromiso.route('/delete/<int:id>', methods=['DELETE'])
def delete(id):
    return compromisoService.delete(id)
