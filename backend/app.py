from flask import Flask, jsonify
from flask_cors import CORS
from extensions import db
from dotenv import load_dotenv
load_dotenv()

from routes.productos import productos_bp
from routes.reservas import reservas_bp
from routes.clientes import clientes_bp
from routes.pagos import pagos_bp
from routes.reportes import reportes_bp
from routes.reportes_pdf import reportes_pdf_bp
from routes.ia_routes import ai_bp
from routes.bcv import bcv_bp

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///inventario.db'


db.init_app(app)

app.register_blueprint(productos_bp)
app.register_blueprint(reservas_bp)
app.register_blueprint(clientes_bp)
app.register_blueprint(pagos_bp)
app.register_blueprint(reportes_bp)
app.register_blueprint(reportes_pdf_bp)
app.register_blueprint(ai_bp, url_prefix='/api/ai')
app.register_blueprint(bcv_bp)


@app.route("/")
def home():
    return ""


with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)