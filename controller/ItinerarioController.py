from flask import Blueprint, request
from service.ItinerarioService import ItinerarioService


itinerario = Blueprint('itinerario', __name__)
itinerarioService = ItinerarioService()

@itinerario.route('/getAll', methods=['GET'])
def getAll():
    return itinerarioService.getAll()

@itinerario.route('/getid/<int:id>', methods=['GET'])
def getid(id):
    return itinerarioService.getId(id)

@itinerario.route('/save', methods=['POST'])
def save():
    return itinerarioService.save(request.get_json())

@itinerario.route('/update', methods=['PUT'])
def update():
    return itinerarioService.update(request.get_json())

@itinerario.route('/delete/<int:id>', methods=['DELETE'])
def delete(id):
    return itinerarioService.delete(id)
