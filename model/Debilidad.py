from sqlalchemy import Column, Integer, String, Date, Time, Boolean
from repository.connector.Connector import Base

class Debilidad(Base):
    __tablename__ = "debilidad"

    id = Column(Integer, primary_key=True)
    id_auditoria = Column(Integer)
    falta = Column(String)
