from sqlalchemy.orm import Session
from model import Documento
from repository.connector.Connector import SessionLocal

class DocumentoRepository:

    def save(self, documento):
        with SessionLocal() as session:
            session.add(documento)
            session.commit()
            documento = session.query(Documento).filter(Documento.id == documento.id).first()
            documento.__delattr__('_sa_instance_state')
            return documento

    def delete(self, id):
        with SessionLocal() as session:
            session.query(Documento).filter(Documento.id == id).delete()
            session.commit()
            return id

    def update(self, documento2):
        documento2.__delattr__('_sa_instance_state')
        with SessionLocal() as session:
            documento = session.query(Documento).filter(Documento.id == documento2.id).first()
            for key, value in documento2.__dict__.items():
                setattr(documento, key, value)
            session.commit()
            documento = session.query(Documento).filter(Documento.id == documento.id).first()
            documento.__delattr__('_sa_instance_state')
            return documento

    def getId(self, id):
        with SessionLocal() as session:
            documento = session.query(Documento).filter(Documento.id == id).first()
            documento.__delattr__('_sa_instance_state')
            return documento

    def getAll(self):
        with SessionLocal() as session:
            lista = session.query(Documento).all()
            for i in lista:
                i.__delattr__('_sa_instance_state')
            return lista
