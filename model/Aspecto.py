from sqlalchemy import Column, Integer, String, Date, Time, Boolean
from repository.connector.Connector import Base


class Aspecto(Base):
    __tablename__ = "aspecto"

    id = Column(Integer, primary_key=True)
    id_auditoria = Column(Integer)
    aspecto = Column(String)
