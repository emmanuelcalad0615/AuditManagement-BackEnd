from sqlalchemy import Column, Integer, String, Date, Time, Boolean
from repository.connector.Connector import Base

class ListaVerificacion(Base):
    __tablename__ = "lista_verificacion"

    id = Column(Integer, primary_key=True)
    descripcion = Column(String)
    cumplimiento = Column(String)
    incumplimiento = Column(String)