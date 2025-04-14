import json
from model.Aspecto import Aspecto
from repository.mysql.AspectoRepository import AspectoRepository

class AspectoService:

    def __init__(self):
        self.repository = AspectoRepository()

    def save(self, data):
        obj = Aspecto()
        for key, value in data.items():
            if hasattr(obj, key):
                setattr(obj, key, value)
        return json.dumps(vars(self.repository.save(obj)))

    def delete(self, id):
        return json.dumps({"id eliminado": self.repository.delete(id)})

    def update(self, data):
        obj = Aspecto()
        for key, value in data.items():
            if hasattr(obj, key):
                setattr(obj, key, value)
        return json.dumps(vars(self.repository.update(obj)))

    def getId(self, id):
        return json.dumps(vars(self.repository.getId(id)))

    def getAll(self):
        return [json.dumps(vars(obj)) for obj in self.repository.getAll()]
