from flask import Blueprint, request
from service.AuditadoPlanService import AuditadoPlanService

auditado_plan = Blueprint('auditado_plan', __name__)
auditadoPlanService = AuditadoPlanService()

@auditado_plan.route('/getAll', methods=['GET'])
def getAll():
    return auditadoPlanService.getAll()

@auditado_plan.route('/getid/<int:id>', methods=['GET'])
def getid(id):
    return auditadoPlanService.getId(id)

@auditado_plan.route('/save', methods=['POST'])
def save():
    return auditadoPlanService.save(request.get_json())

@auditado_plan.route('/update', methods=['PUT'])
def update():
    return auditadoPlanService.update(request.get_json())

@auditado_plan.route('/delete/<int:id>', methods=['DELETE'])
def delete(id):
    return auditadoPlanService.delete(id)
