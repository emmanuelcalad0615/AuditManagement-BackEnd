from sqlalchemy.orm import Session
from model import ListaVerificacion
from repository.connector.Connector import SessionLocal



class ListaVerificacionRepository:

    def save(self, lista_verificacion):
        with SessionLocal() as session:
            session.add(lista_verificacion)
            session.commit()
            lista_verificacion = session.query(ListaVerificacion).filter(ListaVerificacion.id == lista_verificacion.id).first()
            lista_verificacion.__delattr__('_sa_instance_state')
            return lista_verificacion

    def delete(self, id):
        with SessionLocal() as session:
            session.query(ListaVerificacion).filter(ListaVerificacion.id == id).delete()
            session.commit()
            return id

    def update(self, lista_verificacion2):
        lista_verificacion2.__delattr__('_sa_instance_state')
        with SessionLocal() as session:
            lista_verificacion = session.query(ListaVerificacion).filter(ListaVerificacion.id == lista_verificacion2.id).first()

            for key, value in lista_verificacion2.__dict__.items():
                    setattr(lista_verificacion, key, value)
            session.commit()

            lista_verificacion = session.query(ListaVerificacion).filter(ListaVerificacion.id == lista_verificacion.id).first()
            lista_verificacion.__delattr__('_sa_instance_state')
            return lista_verificacion

    def getId(self, id):
        with SessionLocal() as session:
            lista_verificacion = session.query(ListaVerificacion).filter(ListaVerificacion.id == id).first()
            lista_verificacion.__delattr__('_sa_instance_state')
            return lista_verificacion

    def getAll(self):
        with SessionLocal() as session:
            lista = session.query(ListaVerificacion).all()
            for i in lista:
                i.__delattr__('_sa_instance_state')
            return lista
