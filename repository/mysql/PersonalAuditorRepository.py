from sqlalchemy.orm import Session
from model import PersonalAuditor
from repository.connector.Connector import SessionLocal

class PersonalAuditorRepository:

    def save(self, personal_auditor):
        with SessionLocal() as session:
            session.add(personal_auditor)
            session.commit()
            personal_auditor = session.query(PersonalAuditor).filter(PersonalAuditor.id == personal_auditor.id).first()
            personal_auditor.__delattr__('_sa_instance_state')
            return personal_auditor

    def delete(self, id):
        with SessionLocal() as session:
            session.query(PersonalAuditor).filter(PersonalAuditor.id == id).delete()
            session.commit()
            return id

    def update(self, personal_auditor):
        personal_auditor.__delattr__('_sa_instance_state')
        with SessionLocal() as session:
            existing = session.query(PersonalAuditor).filter(PersonalAuditor.id == personal_auditor.id).first()
            for key, value in personal_auditor.__dict__.items():
                setattr(existing, key, value)
            session.commit()
            existing = session.query(PersonalAuditor).filter(PersonalAuditor.id == existing.id).first()
            existing.__delattr__('_sa_instance_state')
            return existing

    def get_id(self, id):
        with SessionLocal() as session:
            personal_auditor = session.query(PersonalAuditor).filter(PersonalAuditor.id == id).first()
            personal_auditor.__delattr__('_sa_instance_state')
            return personal_auditor

    def get_all(self):
        with SessionLocal() as session:
            lista = session.query(PersonalAuditor).all()
            for i in lista:
                i.__delattr__('_sa_instance_state')
            return lista
