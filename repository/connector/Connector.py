from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

"""
Conector del ORM con la DB. No tocar ni por el ptas
"""

Base = declarative_base()
engine = create_engine('mysql+pymysql://root:an515@localhost:3306/gestor_auditorias')

SessionLocal = sessionmaker(autocommit=False, bind=engine)

Base.metadata.create_all(engine)
