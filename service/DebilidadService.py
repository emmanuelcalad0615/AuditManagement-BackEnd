import json
from model import Debilidad
from repository.mysql.DebilidadRepository import DebilidadRepository

class DebilidadService:

    def __init__(self):
        self.repository = DebilidadRepository()

    def save(self, debilidad):
        obj = Debilidad()
        for key, value in debilidad.items():
            if hasattr(obj, key):
                setattr(obj, key, value)
        return json.dumps(vars(self.repository.save(obj)))

    def delete(self, id):
        return {"id eliminado": self.repository.delete(id)}

    def update(self, debilidad):
        obj = Debilidad()
        for key, value in debilidad.items():
            if hasattr(obj, key):
                setattr(obj, key, value)
        return json.dumps(vars(self.repository.update(obj)))

    def getId(self, id):
        return json.dumps(vars(self.repository.getId(id)))

    def getAll(self):
        return [json.dumps(vars(objeto)) for objeto in self.repository.getAll()]
