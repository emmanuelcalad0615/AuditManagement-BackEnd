import json
from model import Oportunidad
from repository.mysql.OportunidadRepository import OportunidadRepository

class OportunidadService:

    def __init__(self):
        self.repository = OportunidadRepository()

    def save(self, oportunidad):
        obj = Oportunidad()
        for key, value in oportunidad.items():
            if hasattr(obj, key):
                setattr(obj, key, value)
        return json.dumps(vars(self.repository.save(obj)))

    def delete(self, id):
        return {"id eliminado": self.repository.delete(id)}

    def update(self, oportunidad):
        obj = Oportunidad()
        for key, value in oportunidad.items():
            if hasattr(obj, key):
                setattr(obj, key, value)
        return json.dumps(vars(self.repository.update(obj)))

    def getId(self, id):
        return json.dumps(vars(self.repository.getId(id)))

    def getAll(self):
        return [json.dumps(vars(objeto)) for objeto in self.repository.getAll()]
