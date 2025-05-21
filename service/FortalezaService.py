import json
from model import Fortaleza
from repository.mysql.FortalezaRepository import FortalezaRepository


def serialize_datetime(obj):
    """Convierte objetos datetime a strings en formato ISO."""
    if isinstance(obj, datetime):
        return obj.isoformat()  
    raise TypeError("Type not serializable")


class FortalezaService:

    def __init__(self):
        self.repository = FortalezaRepository()

    def save(self, fortaleza):
        obj = Fortaleza()
        for key, value in fortaleza.items():
            if hasattr(obj, key):
                setattr(obj, key, value)
        return json.dumps(vars(self.repository.save(obj)))

    def delete(self, id):
        return {"id eliminado": self.repository.delete(id)}

    def update(self, fortaleza):
        obj = Fortaleza()
        for key, value in fortaleza.items():
            if hasattr(obj, key):
                setattr(obj, key, value)
        return json.dumps(vars(self.repository.update(obj)))

    def getId(self, id):
        return json.dumps(vars(self.repository.getId(id)))

    def getAll(self):
        return [json.dumps(vars(objeto)) for objeto in self.repository.getAll()]

    def getByPlan(self, id):
        data = [json.dumps(vars(objeto), default=serialize_datetime) for objeto in self.repository.getByPlan(id)]
        parsed_data = [json.loads(item) for item in data]
        return json.dumps(parsed_data, indent=4)
