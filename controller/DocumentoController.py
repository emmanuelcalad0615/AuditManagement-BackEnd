from flask import Blueprint, request
from service.DocuentoService import DocumentoService

documento = Blueprint('documento', __name__)
documentoService = DocumentoService()

@documento.route('/getAll', methods=['GET'])
def getAll():
    return documentoService.getAll()

@documento.route('/getid/<int:id>', methods=['GET'])
def getid(id):
    return documentoService.getId(id)

@documento.route('/save', methods=['POST'])
def save():
    return documentoService.save(request.get_json())

@documento.route('/update', methods=['PUT'])
def update():
    return documentoService.update(request.get_json())

@documento.route('/delete/<int:id>', methods=['DELETE'])
def delete(id):
    return documentoService.delete(id)
