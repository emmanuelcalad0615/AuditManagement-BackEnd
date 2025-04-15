from flask import Blueprint, request
from service.AuditoriaXListaService import AuditoriaXListaService


auditoriaxlista = Blueprint('auditoriaxlista', __name__)
auditoriaxlistaService = AuditoriaXListaService()

@auditoriaxlista.route('/getAll', methods=['GET'])
def getAll():
    return auditoriaxlistaService.getAll()

@auditoriaxlista.route('/getid/<int:id_auditoria>/<int:id_listaverificacion>', methods=['GET'])
def getid(id_auditoria, id_listaverificacion):
    return auditoriaxlistaService.getId(id_auditoria, id_listaverificacion)

@auditoriaxlista.route('/save', methods=['POST'])
def save():
    return auditoriaxlistaService.save(request.get_json())

@auditoriaxlista.route('/update', methods=['PUT'])
def update():
    return auditoriaxlistaService.update(request.get_json())

@auditoriaxlista.route('/delete/<int:id_auditoria>/<int:id_listaverificacion>', methods=['DELETE'])
def delete(id_auditoria, id_listaverificacion):
    return auditoriaxlistaService.delete(id_auditoria, id_listaverificacion)
