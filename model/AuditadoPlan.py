from sqlalchemy import Column, Integer, String, DateTime, Boolean
from repository.connector.Connector import Base




class AuditadoPlan(Base):
    __tablename__ = "auditado_plan"

    id = Column(Integer, primary_key=True)
    id_auditoria = Column(Integer)
    auditado = Column(String)

