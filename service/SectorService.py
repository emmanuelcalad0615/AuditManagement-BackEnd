import json

from model import Sector
from repository.mysql.SectorRepository import SectorRepository

"""
INSTRUCCIONES:
Cambiar todo lo que diga Sector, por el nombre de la nueva clase con la primera en mayuscula. Verificar mayusculas
Cambiar todo lo que diga sector, por el nombre de la nueva clase con todo en minuscula. Verificar minusculas
"""

# clase de modelo: Sector
# nombre variable: sector

class SectorService:

    def __init__(self):
        self.repository = SectorRepository()


    def save(self, sector):
        obj = Aspecto()
        for key, value in sector.items():
            if hasattr(obj, key):
                setattr(obj, key, value)
        return json.dumps(vars(self.repository.save(obj)))


    def delete(self, id):
        return {"id eliminado": self.repository.delete(id)}

    def update(self, sector):
        obj = Aspecto()
        for key, value in sector.items():
            if hasattr(obj, key):
                setattr(obj, key, value)
        return json.dumps(vars(self.repository.update(obj)))

    def getId(self, id):
        return json.dumps(vars(self.repository.getId(id)))

    def getAll(self):
        return [json.dumps(vars(objeto)) for objeto in self.repository.getAll()]