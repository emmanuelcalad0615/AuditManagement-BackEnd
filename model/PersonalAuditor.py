from sqlalchemy import Column, Integer, String, Date, Time, Boolean
from repository.connector.Connector import Base


class PersonalAuditor(Base):
    __tablename__ = "personal_auditor"

    id = Column(Integer, primary_key=True)
    id_plan = Column(Integer)
    personal = Column(String)
