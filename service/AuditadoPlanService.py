import json
from model import AuditadoPlan
from repository.mysql.AuditadoPlanRepository import AuditadoPlanRepository

class AuditadoPlanService:

    def __init__(self):
        self.repository = AuditadoPlanRepository()

    def save(self, data):
        obj = AuditadoPlan()
        for key, value in data.items():
            if hasattr(obj, key):
                setattr(obj, key, value)
        return json.dumps(vars(self.repository.save(obj)))

    def delete(self, id):
        return {"id eliminado": self.repository.delete(id)}

    def update(self, data):
        obj = AuditadoPlan()
        for key, value in data.items():
            if hasattr(obj, key):
                setattr(obj, key, value)
        return json.dumps(vars(self.repository.update(obj)))

    def getId(self, id):
        return json.dumps(vars(self.repository.getId(id)))
    
    def getIdPlan(self, id):
        data = [json.dumps(vars(objeto)) for objeto in self.repository.getIdPlan(id)]
        parsed_data = [json.loads(item) for item in data]
        return json.dumps(parsed_data, indent=4)

    def getAll(self):
        return [json.dumps(vars(obj)) for obj in self.repository.getAll()]
