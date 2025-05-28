from sqlalchemy import Column, Integer, Boolean, ForeignKey
from repository.connector.Connector import Base

class AuditoriaXLista(Base):
    __tablename__ = "auditoriaXlista"

    id_auditoria = Column(Integer, ForeignKey("auditoria.id"), primary_key=True)
    id_listaverificacion = Column(Integer, ForeignKey("lista_verificacion.id"), primary_key=True)
    cumple = Column(Boolean, default=False)
    aplica = Column(Boolean, default=True)