from sqlalchemy import Column, Integer, String, Date, Time, Boolean
from repository.connector.Connector import Base

class Proposito(Base):
    __tablename__ = "proposito"

    id = Column(Integer, primary_key=True)
    id_plan = Column(Integer)
    descripcion = Column(String(255))


