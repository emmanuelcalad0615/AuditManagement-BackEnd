import json
from model import Auditoria
from repository.mysql.AuditoriaRepository import AuditoriaRepository
from datetime import datetime
import json
from datetime import datetime

def serialize_datetime(obj):
    """Convierte objetos datetime a strings en formato ISO."""
    if isinstance(obj, datetime):
        return obj.isoformat()  
    raise TypeError("Type not serializable")


class AuditoriaService:

    def __init__(self):
        self.repository = AuditoriaRepository()

    def save(self, auditoria):
        obj = Auditoria()
        for key, value in auditoria.items():
            if hasattr(obj, key):
                setattr(obj, key, value)
        # Serializar y convertir datetime a string
        return json.dumps(vars(self.repository.save(obj)), default=serialize_datetime)

    def delete(self, id):
        return {"id eliminado": self.repository.delete(id)}

    def update(self, auditoria):
        obj = Auditoria()
        for key, value in auditoria.items():
            if hasattr(obj, key):
                setattr(obj, key, value)
        return json.dumps(vars(self.repository.update(obj)), default=serialize_datetime)

    def getId(self, id):
        return json.dumps(vars(self.repository.getId(id)), default=serialize_datetime)

    def getAll(self):
        return [json.dumps(vars(objeto), default=serialize_datetime) for objeto in self.repository.getAll()]

    def getByPlan(self, id):
        data = [json.dumps(vars(objeto), default=serialize_datetime) for objeto in self.repository.getByPlan(id)]
        parsed_data = [json.loads(item) for item in data]
        return json.dumps(parsed_data, indent=4)
