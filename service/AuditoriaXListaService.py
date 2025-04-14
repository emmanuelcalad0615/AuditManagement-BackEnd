import json
from repository.mysql.AuditoriaXListaRepository import AuditoriaXListaRepository
from model import AuditoriaXLista


class AuditoriaXListaService:

    def __init__(self):
        self.repository = AuditoriaXListaRepository()

    def save(self, data):
        obj = AuditoriaXLista()
        for key, value in data.items():
            if hasattr(obj, key):
                setattr(obj, key, value)
        return json.dumps(vars(self.repository.save(obj)))

    def delete(self, id_auditoria, id_listaverificacion):
        return json.dumps(self.repository.delete(id_auditoria, id_listaverificacion))

    def update(self, data):
        obj = AuditoriaXLista()
        for key, value in data.items():
            if hasattr(obj, key):
                setattr(obj, key, value)
        return json.dumps(vars(self.repository.update(obj)))

    def getId(self, id_auditoria, id_listaverificacion):
        return json.dumps(vars(self.repository.getId(id_auditoria, id_listaverificacion)))

    def getAll(self):
        return [json.dumps(vars(obj)) for obj in self.repository.getAll()]
