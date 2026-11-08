from flask import Blueprint, jsonify, request
from extensions import db
from datetime import datetime

recargas_bp = Blueprint('recargas_bp', __name__)

class Recarga(db.Model):
    __tablename__ = 'recargas'
    id = db.Column(db.Integer, primary_key=True)
    litros = db.Column(db.Float, nullable=False)
    fecha = db.Column(db.String(50), nullable=False)
    notas = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "litros": self.litros,
            "fecha": self.fecha,
            "notas": self.notas,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }

@recargas_bp.route('/recargas', methods=['GET'])
def get_recargas():
    try:
        recargas = Recarga.query.order_by(Recarga.created_at.desc()).all()
        return jsonify([r.to_dict() for r in recargas]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@recargas_bp.route('/recargas', methods=['POST'])
def add_recarga():
    try:
        data = request.get_json()
        litros = data.get('litros')
        fecha = data.get('fecha')
        notas = data.get('notas', '')

        if litros is None or not fecha:
            return jsonify({"error": "Faltan datos obligatorios (litros o fecha)"}), 400

        nueva_recarga = Recarga(
            litros=float(litros),
            fecha=fecha,
            notas=notas
        )
        
        db.session.add(nueva_recarga)
        db.session.commit()

        return jsonify({"mensaje": "Recarga registrada con éxito"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500