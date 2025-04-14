from sqlalchemy import Column, Integer, String, Date, Time, Boolean
from repository.connector.Connector import Base

class Reunion(Base):
    __tablename__ = "reunion"

    id = Column(Integer, primary_key=True)
    id_plan = Column(Integer)
    fecha = Column(Date)
    hora = Column(Time)
    lugar = Column(String(50))
    apertura = Column(Boolean)

