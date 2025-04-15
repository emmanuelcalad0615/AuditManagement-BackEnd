from flask import Blueprint, request
from service.ListaVerificacionService import ListaVerificacionService


lista_verificacion = Blueprint('lista_verificacion', __name__)
lista_verificacionService = ListaVerificacionService()

@lista_verificacion.route('/getAll', methods=['GET'])
def getAll():
    return lista_verificacionService.getAll()

@lista_verificacion.route('/getid/<int:id>', methods=['GET'])
def getid(id):
    return lista_verificacionService.getId(id)

@lista_verificacion.route('/save', methods=['POST'])
def save():
    return lista_verificacionService.save(request.get_json())

@lista_verificacion.route('/update', methods=['PUT'])
def update():
    return lista_verificacionService.update(request.get_json())

@lista_verificacion.route('/delete/<int:id>', methods=['DELETE'])
def delete(id):
    return lista_verificacionService.delete(id)
