from sqlalchemy import Column, Integer, String, Date, Time, Boolean
from repository.connector.Connector import Base

class Oportunidad(Base):
    __tablename__ = "oportunidad"

    id = Column(Integer, primary_key=True)
    id_auditoria = Column(Integer)
    oportunidad = Column(String(255))
