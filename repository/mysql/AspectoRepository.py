from model.Aspecto import Aspecto
from repository.connector.Connector import SessionLocal

class AspectoRepository:

    def save(self, aspecto):
        with SessionLocal() as session:
            session.add(aspecto)
            session.commit()
            session.refresh(aspecto)
            aspecto.__delattr__('_sa_instance_state')
            return aspecto

    def delete(self, id):
        with SessionLocal() as session:
            session.query(Aspecto).filter(Aspecto.id == id).delete()
            session.commit()
            return id

    def update(self, aspecto_actualizado):
        aspecto_actualizado.__delattr__('_sa_instance_state')
        with SessionLocal() as session:
            aspecto = session.query(Aspecto).filter(Aspecto.id == aspecto_actualizado.id).first()
            for key, value in aspecto_actualizado.__dict__.items():
                setattr(aspecto, key, value)
            session.commit()
            session.refresh(aspecto)
            aspecto.__delattr__('_sa_instance_state')
            return aspecto

    def getId(self, id):
        with SessionLocal() as session:
            aspecto = session.query(Aspecto).filter(Aspecto.id == id).first()
            aspecto.__delattr__('_sa_instance_state')
            return aspecto

    def getAll(self):
        with SessionLocal() as session:
            lista = session.query(Aspecto).all()
            for i in lista:
                i.__delattr__('_sa_instance_state')
            return lista
