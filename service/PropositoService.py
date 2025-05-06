import json
from model import Proposito
from repository.mysql.PropositoRepository import PropositoRepository

class PropositoService:

    def __init__(self):
        self.repository = PropositoRepository()

    def save(self, proposito):
        obj = Proposito()
        for key, value in proposito.items():
            if hasattr(obj, key):
                setattr(obj, key, value)
        return json.dumps(vars(self.repository.save(obj)))
    
    def getByPlan(self, id):
        data = [json.dumps(vars(objeto)) for objeto in self.repository.getByPlan(id)]
        parsed_data = [json.loads(item) for item in data]
        return json.dumps(parsed_data, indent=4)

    def delete(self, id):
        return {"id eliminado": self.repository.delete(id)}

    def update(self, proposito):
        obj = Proposito()
        for key, value in proposito.items():
            if hasattr(obj, key):
                setattr(obj, key, value)
        return json.dumps(vars(self.repository.update(obj)))

    def get_id(self, id):
        return json.dumps(vars(self.repository.get_id(id)))

    def get_all(self):
        return [json.dumps(vars(proposito)) for proposito in self.repository.get_all()]
