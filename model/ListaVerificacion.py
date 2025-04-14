from sqlalchemy import Column, Integer, String, Date, Time, Boolean
from repository.connector.Connector import Base

class ListaVerificacion(Base):
    __tablename__ = "lista_verificacion"

    id = Column(Integer, primary_key=True)
    descripcion = Column(String(255))
    cumplimiento = Column(String(255))
    incumplimiento = Column(String(255))