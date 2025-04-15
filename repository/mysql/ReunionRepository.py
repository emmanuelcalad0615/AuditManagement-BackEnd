from sqlalchemy.orm import Session
from model import Reunion
from repository.connector.Connector import SessionLocal

class ReunionRepository:

    def save(self, reunion):
        with SessionLocal() as session:
            session.add(reunion)
            session.commit()
            reunion = session.query(Reunion).filter(Reunion.id == reunion.id).first()
            reunion.__delattr__('_sa_instance_state')
            return reunion

    def delete(self, id):
        with SessionLocal() as session:
            session.query(Reunion).filter(Reunion.id == id).delete()
            session.commit()
            return id

    def update(self, reunion):
        reunion.__delattr__('_sa_instance_state')
        with SessionLocal() as session:
            existing_reunion = session.query(Reunion).filter(Reunion.id == reunion.id).first()

            for key, value in reunion.__dict__.items():
                setattr(existing_reunion, key, value)
            session.commit()

            existing_reunion = session.query(Reunion).filter(Reunion.id == existing_reunion.id).first()
            existing_reunion.__delattr__('_sa_instance_state')
            return existing_reunion

    def getId(self, id):
        with SessionLocal() as session:
            reunion = session.query(Reunion).filter(Reunion.id == id).first()
            if reunion:
                reunion.__delattr__('_sa_instance_state')
            return reunion

    def getAll(self):
        with SessionLocal() as session:
            lista
