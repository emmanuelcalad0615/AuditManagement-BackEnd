from flask import Blueprint, request
from service.PersonalAuditorService import PersonalAuditorService


personal_auditor = Blueprint('personal_auditor', __name__)
personalAuditorService = PersonalAuditorService()

@personal_auditor.route('/getAll', methods=['GET'])
def get_all():
    return personalAuditorService.get_all()

@personal_auditor.route('/getid/<int:id>', methods=['GET'])
def get_id(id):
    return personalAuditorService.get_id(id)

@personal_auditor.route('/save', methods=['POST'])
def save():
    return personalAuditorService.save(request.get_json())

@personal_auditor.route('/update', methods=['PUT'])
def update():
    return personalAuditorService.update(request.get_json())

@personal_auditor.route('/delete/<int:id>', methods=['DELETE'])
def delete(id):
    return personalAuditorService.delete(id)
