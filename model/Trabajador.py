from sqlalchemy import Column, Integer, String
from repository.connector.Connector import Base

class Trabajador(Base):
    __tablename__ = "trabajador"

    id = Column(Integer, primary_key=True)
    id_sector = Column(Integer)
    nombre = Column(String(50))
    celular = Column(String(10))
    correo = Column(String(50))
    password = Column(String(50))
  
