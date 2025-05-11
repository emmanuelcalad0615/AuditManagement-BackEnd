from model import AuditadoPlan
from repository.connector.Connector import SessionLocal

class AuditadoPlanRepository:

    def save(self, auditado_plan):
        with SessionLocal() as session:
            session.add(auditado_plan)
            session.commit()
            auditado_plan = session.query(AuditadoPlan).filter(AuditadoPlan.id == auditado_plan.id).first()
            auditado_plan.__delattr__('_sa_instance_state')
            return auditado_plan

    def delete(self, id):
        with SessionLocal() as session:
            session.query(AuditadoPlan).filter(AuditadoPlan.id == id).delete()
            session.commit()
            return id

    def update(self, auditado_plan_data):
        auditado_plan_data.__delattr__('_sa_instance_state')
        with SessionLocal() as session:
            auditado_plan = session.query(AuditadoPlan).filter(AuditadoPlan.id == auditado_plan_data.id).first()
            for key, value in auditado_plan_data.__dict__.items():
                setattr(auditado_plan, key, value)
            session.commit()
            auditado_plan = session.query(AuditadoPlan).filter(AuditadoPlan.id == auditado_plan.id).first()
            auditado_plan.__delattr__('_sa_instance_state')
            return auditado_plan

    def getId(self, id):
        with SessionLocal() as session:
            auditado_plan = session.query(AuditadoPlan).filter(AuditadoPlan.id == id).first()
            auditado_plan.__delattr__('_sa_instance_state')
            return auditado_plan
        
    def getIdPlan(self, id):
        with SessionLocal() as session:
            lista = session.query(AuditadoPlan).filter(AuditadoPlan.id_plan == id).all()
            for i in lista:
                i.__delattr__('_sa_instance_state')
            return lista

    def getAll(self):
        with SessionLocal() as session:
            lista = session.query(AuditadoPlan).all()
            for i in lista:
                i.__delattr__('_sa_instance_state')
            return lista
