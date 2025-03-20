from sqlalchemy import Column, Integer, String, Date, Time, BLOB
from repository.connector.Connector import Base

class Documento(Base):
    __tablename__ = "documento"

    id = Column(Integer, primary_key=True)
    id_plan = Column(Integer)
    name = Column(String)
    document = Column(BLOB)

