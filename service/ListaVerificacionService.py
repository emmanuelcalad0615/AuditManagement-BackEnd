import json

from model import ListaVerificacion
from repository.mysql.ListaVerificacionRepository import ListaVerificacionRepository


class ListaVerificacionService:

    def __init__(self):
        self.repository = ListaVerificacionRepository()

    def save(self, lista_verificacion):
        obj = ListaVerificacion()
        for key, value in lista_verificacion.items():
            if hasattr(obj, key):
                setattr(obj, key, value)
        return json.dumps(vars(self.repository.save(obj)))

    def delete(self, id):
        return {"id eliminado": self.repository.delete(id)}

    def update(self, lista_verificacion):
        obj = ListaVerificacion()
        for key, value in lista_verificacion.items():
            if hasattr(obj, key):
                setattr(obj, key, value)
        return json.dumps(vars(self.repository.update(obj)))

    def getId(self, id):
        return json.dumps(vars(self.repository.getId(id)))

    def getAll(self):
        data = [json.dumps(vars(objeto)) for objeto in self.repository.getAll()]
        parsed_data = [json.loads(item) for item in data]
        return json.dumps(parsed_data, indent=4)
