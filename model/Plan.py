from sqlalchemy import Column, Integer, String, DateTime
from repository.connector.Connector import Base

class Plan(Base):
    __tablename__ = "plan"

    id = Column(Integer, primary_key=True)
    tipo = Column(String(30))
    nombre = Column(String(50))
    proceso = Column(String(30))
    lider_proceso = Column(String(50))
    auditor_lider = Column(Integer)
    auditor = Column(Integer)
    fecha = Column(DateTime)
    estado = Column(String(60))
    subtipo = Column(String(60))
    fecha_control = Column(DateTime)
