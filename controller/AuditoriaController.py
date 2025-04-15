from flask import Blueprint, request
from service.AuditoriaService import AuditoriaService


auditoria = Blueprint('auditoria', __name__)
auditoriaService = AuditoriaService()

@auditoria.route('/getAll', methods=['GET'])
def getAll():
    return auditoriaService.getAll()

@auditoria.route('/getid/<int:id>', methods=['GET'])
def getid(id):
    return auditoriaService.getId(id)

@auditoria.route('/save', methods=['POST'])
def save():
    return auditoriaService.save(request.get_json())

@auditoria.route('/update', methods=['PUT'])
def update():
    return auditoriaService.update(request.get_json())

@auditoria.route('/delete/<int:id>', methods=['DELETE'])
def delete(id):
    return auditoriaService.delete(id)
