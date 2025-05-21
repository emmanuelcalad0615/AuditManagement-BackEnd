from sqlalchemy.orm import Session
from model.AuditoriaXLista import AuditoriaXLista
from repository.connector.Connector import SessionLocal

class AuditoriaXListaRepository:

    def save(self, auditoriaxlista):
        with SessionLocal() as session:
            session.add(auditoriaxlista)
            session.commit()
            auditoriaxlista = session.query(AuditoriaXLista).filter(AuditoriaXLista.id_auditoria == auditoriaxlista.id_auditoria, 
                                                                  AuditoriaXLista.id_listaverificacion == auditoriaxlista.id_listaverificacion).first()
            auditoriaxlista.__delattr__('_sa_instance_state')
            return auditoriaxlista

    def delete(self, id_auditoria, id_listaverificacion):
        with SessionLocal() as session:
            session.query(AuditoriaXLista).filter(AuditoriaXLista.id_auditoria == id_auditoria, 
                                                   AuditoriaXLista.id_listaverificacion == id_listaverificacion).delete()
            session.commit()
            return {"id_auditoria": id_auditoria, "id_listaverificacion": id_listaverificacion}

    def update(self, auditoriaxlista):
        auditoriaxlista.__delattr__('_sa_instance_state')
        with SessionLocal() as session:
            existing = session.query(AuditoriaXLista).filter(AuditoriaXLista.id_auditoria == auditoriaxlista.id_auditoria, 
                                                              AuditoriaXLista.id_listaverificacion == auditoriaxlista.id_listaverificacion).first()

            for key, value in auditoriaxlista.__dict__.items():
                setattr(existing, key, value)
            session.commit()
            existing = session.query(AuditoriaXLista).filter(AuditoriaXLista.id_auditoria == existing.id_auditoria, 
                                                              AuditoriaXLista.id_listaverificacion == existing.id_listaverificacion).first()
            existing.__delattr__('_sa_instance_state')
            return existing

    def getId(self, id_auditoria, id_listaverificacion):
        with SessionLocal() as session:
            auditoriaxlista = session.query(AuditoriaXLista).filter(AuditoriaXLista.id_auditoria == id_auditoria, 
                                                                    AuditoriaXLista.id_listaverificacion == id_listaverificacion).first()
            if auditoriaxlista:
                auditoriaxlista.__delattr__('_sa_instance_state')
            return auditoriaxlista

    def getAll(self):
        with SessionLocal() as session:
            lista = session.query(AuditoriaXLista).all()
            for obj in lista:
                obj.__delattr__('_sa_instance_state')
            return lista

    def getByPlan(self, id):
        with SessionLocal() as session:
            lista = session.query(AuditoriaXLista).filter(AuditoriaXLista.id_auditoria == id).all()
            for objeto in lista:
                objeto.__delattr__('_sa_instance_state')
            return lista