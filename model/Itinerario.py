from sqlalchemy import Column, Integer, String, Date, Time, Boolean
from repository.connector.Connector import Base

class Itinerario(Base):
    __tablename__ = "itinerario"

    id = Column(Integer, primary_key=True)
    id_plan = Column(Integer)
    actividad = Column(String)
    auditado = Column(String)
    auditor = Column(String)
    inicio = Column(Time)
    fin = Column(Time)
    lugar = Column(String)

