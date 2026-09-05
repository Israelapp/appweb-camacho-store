from flask import Flask, jsonify
from flask_cors import CORS
from extensions import db

from routes.productos import productos_bp
from routes.reservas import reservas_bp
from routes.clientes import clientes_bp

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///inventario.db'

db.init_app(app)

app.register_blueprint(productos_bp)
app.register_blueprint(reservas_bp)
app.register_blueprint(clientes_bp)


@app.route("/")
def home():
    return "¡Hola! Israel Castillo 🎉"


with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)