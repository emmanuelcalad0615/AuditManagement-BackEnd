import json
from model.Itinerario import Itinerario
from repository.mysql.ItinerarioRepository import ItinerarioRepository

from datetime import time

def serialize_time(obj):
    """Convierte objetos de tipo 'time' a una cadena en formato HH:MM:SS."""
    if isinstance(obj, time):
        return obj.strftime("%H:%M:%S")  # Formato de hora, minuto y segundo
    raise TypeError("Type not serializable")

# Ejemplo de uso en tu servicio o donde sea necesario
class ItinerarioService:

    def __init__(self):
        self.repository = ItinerarioRepository()

    def save(self, itinerario):
        obj = Itinerario()
        for key, value in itinerario.items():
            if hasattr(obj, key):
                setattr(obj, key, value)
        return json.dumps(vars(self.repository.save(obj)), default=serialize_time)

    def delete(self, id):
        return {"id eliminado": self.repository.delete(id)}

    def update(self, itinerario):
        obj = Itinerario()
        for key, value in itinerario.items():
            if hasattr(obj, key):
                setattr(obj, key, value)
        return json.dumps(vars(self.repository.update(obj)), default=serialize_time)

    def getId(self, id):
        return json.dumps(vars(self.repository.getId(id)), default=serialize_time)

    def getAll(self):
        return [json.dumps(vars(objeto), default=serialize_time) for objeto in self.repository.getAll()]
