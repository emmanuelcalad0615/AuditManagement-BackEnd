from sqlalchemy.orm import Session
from model import Oportunidad
from repository.connector.Connector import SessionLocal

class OportunidadRepository:

    def save(self, oportunidad):
        with SessionLocal() as session:
            session.add(oportunidad)
            session.commit()
            oportunidad = session.query(Oportunidad).filter(Oportunidad.id == oportunidad.id).first()
            oportunidad.__delattr__('_sa_instance_state')
            return oportunidad

    def delete(self, id):
        with SessionLocal() as session:
            session.query(Oportunidad).filter(Oportunidad.id == id).delete()
            session.commit()
            return id

    def update(self, oportunidad2):
        oportunidad2.__delattr__('_sa_instance_state')
        with SessionLocal() as session:
            oportunidad = session.query(Oportunidad).filter(Oportunidad.id == oportunidad2.id).first()

            for key, value in oportunidad2.__dict__.items():
                    setattr(oportunidad, key, value)
            session.commit()

            oportunidad = session.query(Oportunidad).filter(Oportunidad.id == oportunidad.id).first()
            oportunidad.__delattr__('_sa_instance_state')
            return oportunidad

    def getId(self, id):
        with SessionLocal() as session:
            oportunidad = session.query(Oportunidad).filter(Oportunidad.id == id).first()
            oportunidad.__delattr__('_sa_instance_state')
            return oportunidad

    def getAll(self):
        with SessionLocal() as session:
            lista = session.query(Oportunidad).all()
            for i in lista:
                i.__delattr__('_sa_instance_state')
            return lista

    def getByPlan(self, id):
        with SessionLocal() as session:
            lista = session.query(Oportunidad).filter(Oportunidad.id_auditoria == id).all()
            for objeto in lista:
                objeto.__delattr__('_sa_instance_state')
            return lista