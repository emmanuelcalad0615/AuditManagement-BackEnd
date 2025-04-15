import json
from model import Plan
from repository.mysql.PlanRepository import PlanRepository
from datetime import datetime

def serialize_datetime(obj):
    """Convierte objetos datetime a strings en formato ISO."""
    if isinstance(obj, datetime):
        return obj.isoformat()  
    raise TypeError("Type not serializable")


class PlanService:

    def __init__(self):
        self.repository = PlanRepository()

    def save(self, plan):
        obj = Plan()
        for key, value in plan.items():
            if hasattr(obj, key):
                setattr(obj, key, value)
        # Serializar y convertir datetime a string
        return json.dumps(vars(self.repository.save(obj)), default=serialize_datetime)

    def delete(self, id):
        return {"id eliminado": self.repository.delete(id)}

    def update(self, plan):
        obj = Plan()
        for key, value in plan.items():
            if hasattr(obj, key):
                setattr(obj, key, value)
        return json.dumps(vars(self.repository.update(obj)), default=serialize_datetime)

    def getId(self, id):
        return json.dumps(vars(self.repository.getId(id)), default=serialize_datetime)

    def getAll(self):
        return [json.dumps(vars(objeto), default=serialize_datetime) for objeto in self.repository.getAll()]
