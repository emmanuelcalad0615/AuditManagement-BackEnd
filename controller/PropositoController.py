from flask import Blueprint, request
from service.PropositoService import PropositoService


proposito = Blueprint('proposito', __name__)
propositoService = PropositoService()

@proposito.route('/getAll', methods=['GET'])
def get_all():
    return propositoService.get_all()

@proposito.route('/getid/<int:id>', methods=['GET'])
def get_id(id):
    return propositoService.get_id(id)

@proposito.route('/save', methods=['POST'])
def save():
    return propositoService.save(request.get_json())

@proposito.route('/update', methods=['PUT'])
def update():
    return propositoService.update(request.get_json())

@proposito.route('/delete/<int:id>', methods=['DELETE'])
def delete(id):
    return propositoService.delete(id)
