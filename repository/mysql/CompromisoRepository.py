from sqlalchemy.orm import Session
from model import Compromiso
from repository.connector.Connector import SessionLocal

class CompromisoRepository:

    def save(self, compromiso):
        with SessionLocal() as session:
            session.add(compromiso)
            session.commit()
            compromiso = session.query(Compromiso).filter(Compromiso.id == compromiso.id).first()
            compromiso.__delattr__('_sa_instance_state')
            return compromiso

    def delete(self, id):
        with SessionLocal() as session:
            session.query(Compromiso).filter(Compromiso.id == id).delete()
            session.commit()
            return id

    def update(self, compromiso2):
        compromiso2.__delattr__('_sa_instance_state')
        with SessionLocal() as session:
            compromiso = session.query(Compromiso).filter(Compromiso.id == compromiso2.id).first()

            for key, value in compromiso2.__dict__.items():
                setattr(compromiso, key, value)
            session.commit()

            compromiso = session.query(Compromiso).filter(Compromiso.id == compromiso.id).first()
            compromiso.__delattr__('_sa_instance_state')
            return compromiso

    def getId(self, id):
        with SessionLocal() as session:
            compromiso = session.query(Compromiso).filter(Compromiso.id == id).first()
            compromiso.__delattr__('_sa_instance_state')
            return compromiso

    def getAll(self):
        with SessionLocal() as session:
            lista = session.query(Compromiso).all()
            for i in lista:
                i.__delattr__('_sa_instance_state')
            return lista
