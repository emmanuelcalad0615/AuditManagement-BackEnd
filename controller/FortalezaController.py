from flask import Blueprint, request
from service.FortalezaService import FortalezaService

fortaleza = Blueprint('fortaleza', __name__)
fortalezaService = FortalezaService()

@fortaleza.route('/getAll', methods=['GET'])
def getAll():
    return fortalezaService.getAll()

@fortaleza.route('/getid/<int:id>', methods=['GET'])
def getid(id):
    return fortalezaService.getId(id)

@fortaleza.route('/save', methods=['POST'])
def save():
    return fortalezaService.save(request.get_json())

@fortaleza.route('/update', methods=['PUT'])
def update():
    return fortalezaService.update(request.get_json())

@fortaleza.route('/delete/<int:id>', methods=['DELETE'])
def delete(id):
    return fortalezaService.delete(id)
