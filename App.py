from flask import Flask, request, jsonify, render_template
from repository.connector.Connector import Base, engine
from controller.AspectoController import aspecto
from controller.AuditadoPlanController import auditado_plan
from controller.AuditoriaController import auditoria
from controller.AuditoriaXListaController import auditoriaxlista
from controller.CompromisoController import compromiso
from controller.DebilidadController import debilidad
from controller.DocumentoController import documento
from controller.FortalezaController import fortaleza
from controller.ItinerarioController import itinerario
from controller.ListaVerificacionController import lista_verificacion
from controller.OportunidadController import oportunidad
from controller.PerosnalAuditorController import personal_auditor
from controller.PlanController import plan
from controller.PropositoController import proposito
from controller.ReunionController import reunion
from controller.TrabajadorController import trabajador

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
app.register_blueprint(documento, url_prefix='/documento')
app.register_blueprint(fortaleza, url_prefix='/fortaleza')
app.register_blueprint(itinerario, url_prefix='/itinerario')
app.register_blueprint(lista_verificacion, url_prefix='/lista_verificacion')
app.register_blueprint(oportunidad, url_prefix='/oportunidad')
app.register_blueprint(personal_auditor, url_prefix='/personal_auditor')
app.register_blueprint(plan, url_prefix='/plan')
app.register_blueprint(proposito, url_prefix='/proposito')
app.register_blueprint(reunion, url_prefix='/reunion')
app.register_blueprint(trabajador, url_prefix='/trabajador')




if __name__ == "__main__":
    app.run(debug=True)