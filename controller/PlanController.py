from flask import Blueprint, request
from service.PlanService import PlanService


plan = Blueprint('plan', __name__)
planService = PlanService()

@plan.route('/getAll', methods=['GET'])
def getAll():
    return planService.getAll()

@plan.route('/getid/<int:id>', methods=['GET'])
def getid(id):
    return planService.getId(id)

@plan.route('/save', methods=['POST'])
def save():
    return planService.save(request.get_json())

@plan.route('/update', methods=['PUT'])
def update():
    return planService.update(request.get_json())

@plan.route('/delete/<int:id>', methods=['DELETE'])
def delete(id):
    return planService.delete(id)
