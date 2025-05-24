from sqlalchemy.orm import Session
from model import Trabajador
from repository.connector.Connector import SessionLocal


class TrabajadorRepository:

    def save(self, trabajador):
        with SessionLocal() as session:
            session.add(trabajador)
            session.commit()
            trabajador = session.query(Trabajador).filter(Trabajador.id == trabajador.id).first()
            trabajador.__delattr__('_sa_instance_state')
            return trabajador

    def delete(self, id):
        with SessionLocal() as session:
            session.query(Trabajador).filter(Trabajador.id == id).delete()
            session.commit()
            return id

    def update(self, trabajador2):
        trabajador2.__delattr__('_sa_instance_state')
        with SessionLocal() as session:
            trabajador = session.query(Trabajador).filter(Trabajador.id == trabajador2.id).first()
            for key, value in trabajador2.__dict__.items():
                setattr(trabajador, key, value)
            session.commit()
            trabajador = session.query(Trabajador).filter(Trabajador.id == trabajador.id).first()
            trabajador.__delattr__('_sa_instance_state')
            return trabajador

    def getId(self, id):
        with SessionLocal() as session:
            trabajador = session.query(Trabajador).filter(Trabajador.id == id).first()
            trabajador.__delattr__('_sa_instance_state')
            return trabajador

    def login(self, password, email):

        with SessionLocal() as session:
            trabajador = session.query(Trabajador).filter(Trabajador.correo == email, Trabajador.password == password).first()
            if trabajador == None:
                return {}
            trabajador.__delattr__('_sa_instance_state')
            return trabajador

    def getAll(self):
        with SessionLocal() as session:
            lista = session.query(Trabajador).all()
            for i in lista:
                i.__delattr__('_sa_instance_state')
            return lista
