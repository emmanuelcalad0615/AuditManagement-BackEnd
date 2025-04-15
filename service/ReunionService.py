import json
from model import Reunion
from repository.mysql.ReunionRepository import ReunionRepository
# Al inicio del archivo
from datetime import datetime, date, time

def serialize_datetime(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    elif isinstance(obj, date):
        return obj.isoformat()
    elif isinstance(obj, time):
        return obj.strftime("%H:%M:%S")
    raise TypeError("Type not serializable: {}".format(type(obj)))

class ReunionService:

    def __init__(self):
        # Iniciamos el repositorio
        self.repository = ReunionRepository()

    def save(self, reunion):
        # Creamos una nueva instancia de Reunion
        obj = Reunion()
        # Iteramos por las claves y valores del diccionario 'reunion'
        for key, value in reunion.items():
            # Si la clave existe en el objeto Reunion, la asignamos
            if hasattr(obj, key):
                setattr(obj, key, value)
        # Serializamos el objeto y retornamos como JSON, manejando fechas
        return json.dumps(vars(self.repository.save(obj)), default=serialize_datetime)

    def delete(self, id):
        # Eliminar una Reunion por ID y retornar la confirmación
        return {"id eliminado": self.repository.delete(id)}

    def update(self, reunion):
        # Creamos una nueva instancia de Reunion para actualizar
        obj = Reunion()
        # Iteramos sobre los datos de la reunion
        for key, value in reunion.items():
            if hasattr(obj, key):
                setattr(obj, key, value)
        # Serializamos el objeto actualizado
        return json.dumps(vars(self.repository.update(obj)), default=serialize_datetime)

    def getId(self, id):
        # Obtener Reunion por ID y devolverla serializada
        return json.dumps(vars(self.repository.getId(id)), default=serialize_datetime)

    def getAll(self):
        # Obtener todas las Reuniones y devolverlas serializadas
        return [json.dumps(vars(objeto), default=serialize_datetime) for objeto in self.repository.getAll()]
