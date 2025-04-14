from flask import Flask, request, jsonify, render_template
from repository.connector.Connector import Base, engine
from controller.AspectoController import aspecto
from controller.AuditadoPlanController import auditado_plan
from controller.AuditoriaController import auditoria

from controller import sector
Base.metadata.create_all(bind=engine)
app = Flask(__name__)
app.register_blueprint(sector, url_prefix='/sector')
app.register_blueprint(aspecto, url_prefix='/aspecto')
app.register_blueprint(auditado_plan, url_prefix='/auditado_plan')
app.register_blueprint(auditoria, url_prefix='/auditoria')



if __name__ == "__main__":
    app.run(debug=True)