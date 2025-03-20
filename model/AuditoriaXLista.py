from sqlalchemy import Column, Integer, String, Date, Time, Boolean
from repository.connector.Connector import Base

class AuditoriaXLista(Base):
    __tablename__ = "auditoriaXlista"

    id_auditoria = Column(Integer, primary_key=True)
    id_listaverificacion = Column(Integer, primary_key=True)
    cumple = Column(Boolean)
    aplica = Column(Boolean)
