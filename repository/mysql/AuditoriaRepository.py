from sqlalchemy.orm import Session
from model import Auditoria
from repository.connector.Connector import SessionLocal

class AuditoriaRepository:

    def save(self, auditoria):
        with SessionLocal() as session:
            session.add(auditoria)
            session.commit()
            auditoria = session.query(Auditoria).filter(Auditoria.id == auditoria.id).first()
            auditoria.__delattr__('_sa_instance_state')
            return auditoria

    def delete(self, id):
        with SessionLocal() as session:
            session.query(Auditoria).filter(Auditoria.id == id).delete()
            session.commit()
            return id

    def update(self, auditoria2):
        auditoria2.__delattr__('_sa_instance_state')
        with SessionLocal() as session:
            auditoria = session.query(Auditoria).filter(Auditoria.id == auditoria2.id).first()

            for key, value in auditoria2.__dict__.items():
                setattr(auditoria, key, value)
            session.commit()

            auditoria = session.query(Auditoria).filter(Auditoria.id == auditoria.id).first()
            auditoria.__delattr__('_sa_instance_state')
            return auditoria

    def getId(self, id):
        with SessionLocal() as session:
            auditoria = session.query(Auditoria).filter(Auditoria.id == id).first()
            auditoria.__delattr__('_sa_instance_state')
            return auditoria

    def getAll(self):
        with SessionLocal() as session:
            lista = session.query(Auditoria).all()
            for i in lista:
                i.__delattr__('_sa_instance_state')
            return lista
