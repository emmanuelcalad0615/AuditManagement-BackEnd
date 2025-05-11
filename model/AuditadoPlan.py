from sqlalchemy import Column, Integer, String, DateTime, Boolean
from repository.connector.Connector import Base




class AuditadoPlan(Base):
    __tablename__ = "auditado_plan"

    id = Column(Integer, primary_key=True, autoincrement=True)
    id_plan = Column(Integer)
    auditado = Column(String(255))

