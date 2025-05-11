from sqlalchemy.orm import Session
from model.Itinerario import Itinerario
from repository.connector.Connector import SessionLocal

class ItinerarioRepository:

    def save(self, itinerario):
        with SessionLocal() as session:
            session.add(itinerario)
            session.commit()
            itinerario = session.query(Itinerario).filter(Itinerario.id == itinerario.id).first()
            itinerario.__delattr__('_sa_instance_state')
            return itinerario

    def delete(self, id):
        with SessionLocal() as session:
            session.query(Itinerario).filter(Itinerario.id == id).delete()
            session.commit()
            return {"id": id}

    def update(self, itinerario):
        itinerario.__delattr__('_sa_instance_state')
        with SessionLocal() as session:
            existing = session.query(Itinerario).filter(Itinerario.id == itinerario.id).first()
            for key, value in itinerario.__dict__.items():
                setattr(existing, key, value)
            session.commit()
            existing = session.query(Itinerario).filter(Itinerario.id == existing.id).first()
            existing.__delattr__('_sa_instance_state')
            return existing

    def getId(self, id):
        with SessionLocal() as session:
            itinerario = session.query(Itinerario).filter(Itinerario.id == id).first()
            if itinerario:
                itinerario.__delattr__('_sa_instance_state')
            return itinerario

    def getAll(self):
        with SessionLocal() as session:
            lista = session.query(Itinerario).all()
            for obj in lista:
                obj.__delattr__('_sa_instance_state')
            return lista

    def getByPlan(self, id):
        with SessionLocal() as session:
            lista = session.query(Itinerario).filter(Itinerario.id_plan == id).all()
            for itinerario in lista:
                itinerario.__delattr__('_sa_instance_state')
            return lista