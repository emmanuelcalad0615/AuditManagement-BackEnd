from sqlalchemy import Column, Integer, String, DateTime
from repository.connector.Connector import Base

class Plan(Base):
    __tablename__ = "plan"

    id = Column(Integer, primary_key=True)
    tipo = Column(String)
    nombre = Column(String)
    proceso = Column(String)
    lider_proceso = Column(String)
    auditor_lider = Column(Integer)
    auditor = Column(Integer)
    fecha = Column(DateTime)
    fecha_control = Column(DateTime)
