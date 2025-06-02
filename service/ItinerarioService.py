import json
from model.Itinerario import Itinerario
from repository.mysql.ItinerarioRepository import ItinerarioRepository

from datetime import time,datetime

def parse_hora(hora_str):
    """Convierte 'HH:MM' a datetime.time, o devuelve None si falla"""
    try:
        return datetime.strptime(hora_str, "%H:%M").time()
    except (ValueError, TypeError):
        return None

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
        print("SAVE DE ITINERARIOS")
        print(vars(obj))
        return json.dumps(vars(self.repository.save(obj)), default=serialize_time)

    def delete(self, id):
        return {"id eliminado": self.repository.delete(id)}

    def update(self, itinerario):
        obj = Itinerario()
        for key, value in itinerario.items():
            if hasattr(obj, key):
                # Si es campo de hora, conviértelo
                if key in ("inicio", "fin") and isinstance(value, str):
                    hora_obj = parse_hora(value)
                    setattr(obj, key, hora_obj)
                else:
                    setattr(obj, key, value)

        print("UPDATE DE ITINERARIOS")
        print(vars(obj))
        return json.dumps(vars(self.repository.update(obj)), default=serialize_time)

    def getId(self, id):
        return json.dumps(vars(self.repository.getId(id)), default=serialize_time)

    def getAll(self):
        return [json.dumps(vars(objeto), default=serialize_time) for objeto in self.repository.getAll()]

    def getByPlan(self, id):
        data = [json.dumps(vars(objeto), default=serialize_time) for objeto in self.repository.getByPlan(id)]
        parsed_data = [json.loads(item) for item in data]
        return json.dumps(parsed_data, indent=4)