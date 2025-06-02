from sqlalchemy.orm import Session
from model.Fortaleza import Fortaleza
from repository.connector.Connector import SessionLocal

class FortalezaRepository:

    def save(self, fortaleza):
        with SessionLocal() as session:
            session.add(fortaleza)
            session.commit()
            
            fortaleza = session.query(Fortaleza).filter(Fortaleza.id_auditoria == fortaleza.id_auditoria).first()
            fortaleza.__delattr__('_sa_instance_state')  
            return fortaleza

    def delete(self, id):
        with SessionLocal() as session:
            session.query(Fortaleza).filter(Fortaleza.id == id).delete()
            session.commit()
            return {"id_auditoria": id}

    def update(self, fortaleza):
        
        fortaleza.__delattr__('_sa_instance_state')  
        with SessionLocal() as session:
            existing = session.query(Fortaleza).filter(Fortaleza.id_auditoria == fortaleza.id_auditoria).first()

            
            for key, value in fortaleza.__dict__.items():
                setattr(existing, key, value)

            session.commit()
            
            existing = session.query(Fortaleza).filter(Fortaleza.id_auditoria == existing.id_auditoria).first()
            existing.__delattr__('_sa_instance_state')
            return existing

    def getId(self, id_auditoria):
        with SessionLocal() as session:
            fortaleza = session.query(Fortaleza).filter(Fortaleza.id_auditoria == id_auditoria).first()
            if fortaleza:
                fortaleza.__delattr__('_sa_instance_state')  
            return fortaleza

    def getAll(self):
        with SessionLocal() as session:
            lista = session.query(Fortaleza).all()
            for obj in lista:
                obj.__delattr__('_sa_instance_state')  
            return lista

    def getByPlan(self, id):
        with SessionLocal() as session:
            lista = session.query(Fortaleza).filter(Fortaleza.id_auditoria == id).all()
            for objeto in lista:
                objeto.__delattr__('_sa_instance_state')
            return lista