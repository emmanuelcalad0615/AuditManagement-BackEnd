from sqlalchemy import Column, Integer, DateTime
from repository.connector.Connector import Base

class Auditoria(Base):
    __tablename__ = "auditoria"

    id = Column(Integer, primary_key=True, autoincrement=True)
    id_plan = Column(Integer)
    fecha = Column(DateTime)
