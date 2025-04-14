from flask import Flask, request, jsonify, render_template
from repository.connector.Connector import Base, engine
from controller.AspectoController import aspecto
from controller.AuditadoPlanController import auditado_plan
from controller.AuditoriaController import auditoria
from controller.AuditoriaXListaController import auditoriaxlista
from controller.CompromisoController import compromiso
from controller.DebilidadController import debilidad

from controller import sector
Base.metadata.create_all(bind=engine)
app = Flask(__name__)
app.register_blueprint(sector, url_prefix='/sector')
app.register_blueprint(aspecto, url_prefix='/aspecto')
app.register_blueprint(auditado_plan, url_prefix='/auditado_plan')
app.register_blueprint(auditoria, url_prefix='/auditoria')
app.register_blueprint(auditoriaxlista, url_prefix='/auditoriaxlista')
app.register_blueprint(compromiso, url_prefix='/compromiso')
app.register_blueprint(debilidad, url_prefix='/debilidad')




if __name__ == "__main__":
    app.run(debug=True)