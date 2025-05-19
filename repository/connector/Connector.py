from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

"""
Conector del ORM con la DB.
"""

Base = declarative_base()
#engine = create_engine('mysql+pymysql://root:MiContrasena123@localhost:3306/auditorias')
engine = create_engine('mysql+pymysql://root:Joaco06151970@localhost:6666/gestor_auditorias')

SessionLocal = sessionmaker(autocommit=False, bind=engine)

Base.metadata.create_all(engine)
