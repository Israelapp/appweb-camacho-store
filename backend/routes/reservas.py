from datetime import datetime
from flask import Blueprint, jsonify, request
from extensions import db
from models.Reservas import Reservas
from .whatssap import enviar_alerta_whatsapp

reservas_bp = Blueprint('reservas', __name__)

@reservas_bp.route("/api/reservas", methods=["GET"])
def obtener_reserva():
    Reserva_db = Reservas.query.all()
    lista = []
    for reserva in Reserva_db:
        lista.append(reserva.to_dict())
    return jsonify(lista)


@reservas_bp.route("/api/reservas", methods=['POST'])
def crear_reserva():
    datos = request.get_json()

    if not datos or "litros" not in datos:
        return jsonify({"error": "Los litros son obligatorios"}), 400
    if not datos or "cliente" not in datos:
        return jsonify({"error": "Debe incluir los datos correctos"}), 400

    # 🛠️ Convertir el string de fecha (YYYY-MM-DD) a un objeto date de Python
    fecha_str = datos.get('fecha')
    fecha_obj = None
    if fecha_str:
        try:
            fecha_obj = datetime.strptime(fecha_str, '%Y-%m-%d').date()
        except ValueError:
            return jsonify({"error": "Formato de fecha inválido. Use YYYY-MM-DD"}), 400

    reserva_nueva = Reservas(
        cliente=datos['cliente'],
        litros=datos.get('litros', 0), 
        total=datos.get('total', 0),  # <--- Capturamos el total enviado desde el frontend
        estado=datos.get('estado', 'pendiente'),
        fecha=fecha_obj,              # <--- Asignamos el objeto date de Python
    )

    db.session.add(reserva_nueva)
    db.session.commit()

    # ⚡ Llamamos a la función de WhatsApp justo después de guardar con éxito
    try:
        enviar_alerta_whatsapp(
            cliente=reserva_nueva.cliente,
            litros=reserva_nueva.litros,
            total=getattr(reserva_nueva, 'total', 0), 
            fecha=str(reserva_nueva.fecha) if reserva_nueva.fecha else "Sin fecha especificada"
        )
    except Exception as e:
        print("Error al disparar la alerta de WhatsApp:", e)

    return jsonify(reserva_nueva.to_dict()), 201


@reservas_bp.route("/api/reservas/<int:reserva_id>", methods=["DELETE"])
def delete_reservas(reserva_id):
    reserva = Reservas.query.get(reserva_id)

    if not reserva:
        return jsonify({"error": "Cliente no encontrado"}), 404
        
    db.session.delete(reserva)
    db.session.commit()
    return jsonify({"Eliminado": "Reserva Eliminada"})


@reservas_bp.route("/api/reservas/<int:reserva_id>", methods=["PUT"])
def actualizar_reserva(reserva_id):
    reserva = Reservas.query.get(reserva_id)
    
    if not reserva:
        return jsonify({"error": "Reserva no encontrada"}), 404

    datos = request.get_json()

    if "cliente" in datos:
        reserva.cliente = datos["cliente"]

    if "litros" in datos:
        reserva.litros = datos["litros"]

    if "total" in datos:
        reserva.total = datos["total"]

    if "estado" in datos:
        reserva.estado = datos["estado"]

    if "fecha" in datos:
        fecha_str = datos["fecha"]
        if fecha_str:
            try:
                reserva.fecha = datetime.strptime(fecha_str, '%Y-%m-%d').date()
            except ValueError:
                return jsonify({"error": "Formato de fecha inválido. Use YYYY-MM-DD"}), 400

    db.session.commit()
    return jsonify(reserva.to_dict()), 200