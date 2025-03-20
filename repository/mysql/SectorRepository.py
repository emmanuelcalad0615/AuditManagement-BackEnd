from sqlalchemy.orm import Session
from model import Sector
from repository.connector.Connector import SessionLocal

"""
INSTRUCCIONES:
Cambiar todo lo que diga Sector, por el nombre de la nueva clase con la primera en mayuscula. Verificar mayusculas
Cambiar todo lo que diga sector, por el nombre de la nueva clase con todo en minuscula. Verificar minusculas
"""

# clase de modelo: Sector
# nombre variable: sector

class SectorRepository:

    def save(self,sector):
        with SessionLocal() as session:
            session.add(sector)
            session.commit()
            sector = session.query(Sector).filter(Sector.id == sector.id).first()
            sector.__delattr__('_sa_instance_state')
            return sector

    def delete(self,id):
        with SessionLocal() as session:
            session.query(Sector).filter(Sector.id == id).delete()
            session.commit()
            return id

    def update(self,sector2):
        sector2.__delattr__('_sa_instance_state')
        with SessionLocal() as session:
            sector = session.query(Sector).filter(Sector.id == sector2.id).first()

            for key, value in sector2.__dict__.items():
                    setattr(sector, key, value)
            session.commit()

            sector = session.query(Sector).filter(Sector.id == sector.id).first()
            sector.__delattr__('_sa_instance_state')
            return sector


    def getId(self,id):
        with SessionLocal() as session:
            sector = session.query(Sector).filter(Sector.id == id).first()
            sector.__delattr__('_sa_instance_state')
            return sector

    def getAll(self):
        with SessionLocal() as session:
            lista = session.query(Sector).all()
            for i in lista:
                i.__delattr__('_sa_instance_state')
            return lista