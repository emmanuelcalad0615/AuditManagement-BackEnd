from sqlalchemy import Column, Integer, String, DateTime, Boolean
from repository.connector.Connector import Base

class Compromiso(Base):
    __tablename__ = "compromiso"

    id = Column(Integer, primary_key=True)
    id_auditoria = Column(Integer)
    compromiso = Column(String)
    fecha_limite = Column(DateTime)
    responsable = Column(String)
