from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

"""
Conector del ORM con la DB.
"""

Base = declarative_base()
engine = create_engine('mysql+pymysql://guttentag:mysqldatabasepass@database-2.cls28w4sc51e.us-east-2.rds.amazonaws.com:3306/auditorias')

SessionLocal = sessionmaker(autocommit=False, bind=engine)

Base.metadata.create_all(engine)
