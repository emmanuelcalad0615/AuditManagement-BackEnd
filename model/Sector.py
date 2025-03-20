from sqlalchemy import Column, Integer, String
from repository.connector.Connector import Base

class Sector(Base):
    __tablename__ = "sector"

    id = Column(Integer, primary_key=True)
    nombre = Column(String)
