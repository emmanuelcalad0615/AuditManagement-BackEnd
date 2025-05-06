from sqlalchemy.orm import Session
from model import Plan
from repository.connector.Connector import SessionLocal

class PlanRepository:

    def save(self, plan):
        with SessionLocal() as session:
            session.add(plan)
            session.commit()
            plan = session.query(Plan).filter(Plan.id == plan.id).first()
            plan.__delattr__('_sa_instance_state')
            return plan

    def delete(self, id):
        with SessionLocal() as session:
            session.query(Plan).filter(Plan.id == id).delete()
            session.commit()
            return id

    def update(self, plan):
        plan.__delattr__('_sa_instance_state')
        with SessionLocal() as session:
            existing = session.query(Plan).filter(Plan.id == plan.id).first()
            for key, value in plan.__dict__.items():
                setattr(existing, key, value)
            session.commit()
            existing = session.query(Plan).filter(Plan.id == existing.id).first()
            existing.__delattr__('_sa_instance_state')
            return existing

    def getId(self, id):
        with SessionLocal() as session:
            plan = session.query(Plan).filter(Plan.id == id).first()
            plan.__delattr__('_sa_instance_state')
            return plan

    def getAll(self):
        with SessionLocal() as session:
            lista = session.query(Plan).all()
            for i in lista:
                i.__delattr__('_sa_instance_state')
            return lista
