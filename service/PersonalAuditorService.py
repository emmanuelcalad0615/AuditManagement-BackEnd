import json
from model import PersonalAuditor
from repository.mysql.PersonalAuditorRepository import PersonalAuditorRepository

class PersonalAuditorService:

    def __init__(self):
        self.repository = PersonalAuditorRepository()

    def save(self, personal_auditor):
        obj = PersonalAuditor()
        for key, value in personal_auditor.items():
            if hasattr(obj, key):
                setattr(obj, key, value)
        return json.dumps(vars(self.repository.save(obj)))

    def delete(self, id):
        return {"id eliminado": self.repository.delete(id)}

    def update(self, personal_auditor):
        obj = PersonalAuditor()
        for key, value in personal_auditor.items():
            if hasattr(obj, key):
                setattr(obj, key, value)
        return json.dumps(vars(self.repository.update(obj)))

    def get_id(self, id):
        return json.dumps(vars(self.repository.get_id(id)))

    def get_all(self):
        return [json.dumps(vars(obj)) for obj in self.repository.get_all()]
