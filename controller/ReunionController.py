from flask import Blueprint, request
from service.ReunionService import ReunionService


reunion = Blueprint('reunion', __name__)
reunionService = ReunionService()


@reunion.route('/getAll', methods=['GET'])
def getAll():
    return reunionService.getAll()


@reunion.route('/getid/<int:id>', methods=['GET'])
def getid(id):
    return reunionService.getId(id)


@reunion.route('getByPlan/<int:id>', methods=['GET'])
def getByPlan(id):
    return reunionService.getByPlan(id)

@reunion.route('/save', methods=['POST'])
def save():
    return reunionService.save(request.get_json())


@reunion.route('/update', methods=['PUT'])
def update():
    return reunionService.update(request.get_json())


@reunion.route('/delete/<int:id>', methods=['DELETE'])
def delete(id):
    return reunionService.delete(id)