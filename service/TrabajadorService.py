import json
from model import Trabajador
from model import Login
from repository.mysql.TrabajadorRepository import TrabajadorRepository

class TrabajadorService:

    def __init__(self):
        self.repository = TrabajadorRepository()

    def save(self, trabajador):
        obj = Trabajador()
        for key, value in trabajador.items():
            if hasattr(obj, key):
                setattr(obj, key, value)
        return json.dumps(vars(self.repository.save(obj)))

    def delete(self, id):
        return {"id eliminado": self.repository.delete(id)}

    def update(self, trabajador):
        obj = Trabajador()
        for key, value in trabajador.items():
            if hasattr(obj, key):
                setattr(obj, key, value)
        return json.dumps(vars(self.repository.update(obj)))

    def getId(self, id):
        return json.dumps(vars(self.repository.getId(id)))

    def login(self, login):
    
        obj = Login()
        for key, value in login.items():
            if hasattr(obj, key):
                setattr(obj, key, value)

        return json.dumps(vars(self.repository.login(obj.password,obj.correo)))

    def getAll(self):
        data = [json.dumps(vars(objeto)) for objeto in self.repository.getAll()]
        parsed_data = [json.loads(item) for item in data]
        return json.dumps(parsed_data, indent=4)
