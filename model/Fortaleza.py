from sqlalchemy import Column, Integer, String, Date, Time, Boolean
from repository.connector.Connector import Base

class Fortaleza(Base):
    __tablename__ = "fortaleza"

    id = Column(Integer, primary_key=True)
    id_auditoria = Column(Integer)
    virtud = Column(String(255))

