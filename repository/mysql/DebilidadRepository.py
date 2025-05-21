from sqlalchemy.orm import Session
from model import Debilidad
from repository.connector.Connector import SessionLocal

class DebilidadRepository:

    def save(self, debilidad):
        with SessionLocal() as session:
            session.add(debilidad)
            session.commit()
            debilidad = session.query(Debilidad).filter(Debilidad.id == debilidad.id).first()
            debilidad.__delattr__('_sa_instance_state')
            return debilidad

    def delete(self, id):
        with SessionLocal() as session:
            session.query(Debilidad).filter(Debilidad.id == id).delete()
            session.commit()
            return id

    def update(self, debilidad2):
        debilidad2.__delattr__('_sa_instance_state')
        with SessionLocal() as session:
            debilidad = session.query(Debilidad).filter(Debilidad.id == debilidad2.id).first()

            for key, value in debilidad2.__dict__.items():
                setattr(debilidad, key, value)
            session.commit()

            debilidad = session.query(Debilidad).filter(Debilidad.id == debilidad.id).first()
            debilidad.__delattr__('_sa_instance_state')
            return debilidad

    def getId(self, id):
        with SessionLocal() as session:
            debilidad = session.query(Debilidad).filter(Debilidad.id == id).first()
            debilidad.__delattr__('_sa_instance_state')
            return debilidad

    def getAll(self):
        with SessionLocal() as session:
            lista = session.query(Debilidad).all()
            for i in lista:
                i.__delattr__('_sa_instance_state')
            return lista

    def getByPlan(self, id):
        with SessionLocal() as session:
            lista = session.query(Debilidad).filter(Debilidad.id_auditoria == id).all()
            for objeto in lista:
                objeto.__delattr__('_sa_instance_state')
            return lista