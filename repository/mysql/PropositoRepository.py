from sqlalchemy.orm import Session
from model import Proposito
from repository.connector.Connector import SessionLocal

class PropositoRepository:

    def save(self, proposito):
        with SessionLocal() as session:
            session.add(proposito)
            session.commit()
            proposito = session.query(Proposito).filter(Proposito.id == proposito.id).first()
            proposito.__delattr__('_sa_instance_state')
            return proposito

    def delete(self, id):
        with SessionLocal() as session:
            session.query(Proposito).filter(Proposito.id == id).delete()
            session.commit()
            return id

    def update(self, proposito):
        proposito.__delattr__('_sa_instance_state')
        with SessionLocal() as session:
            existing_proposito = session.query(Proposito).filter(Proposito.id == proposito.id).first()

            for key, value in proposito.__dict__.items():
                setattr(existing_proposito, key, value)
            session.commit()

            existing_proposito = session.query(Proposito).filter(Proposito.id == existing_proposito.id).first()
            existing_proposito.__delattr__('_sa_instance_state')
            return existing_proposito

    def get_id(self, id):
        with SessionLocal() as session:
            proposito = session.query(Proposito).filter(Proposito.id == id).first()
            proposito.__delattr__('_sa_instance_state')
            return proposito

    def get_all(self):
        with SessionLocal() as session:
            lista = session.query(Proposito).all()
            for proposito in lista:
                proposito.__delattr__('_sa_instance_state')
            return lista
