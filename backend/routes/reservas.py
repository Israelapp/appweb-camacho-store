from flask import Blueprint, jsonify, request
from extensions import db
from models.Reservas import Reservas

reservas_bp = Blueprint ('reservas', __name__)

@reservas_bp.route("/api/reservas", methods = ["GET"])
def obtener_reserva():
    Reserva_db  = Reservas.query.all()
    lista =[]
    for reserva in Reserva_db:
        lista.append(reserva.to_dict())
    return jsonify(lista)


@reservas_bp.route("/api/reservas", methods =['Post'])
def crear_reserva():
    datos = request.get_json()


    if not datos or "litros" not in datos:
        return jsonify ({"error": "Los litros son obligatorio"}), 400
    if not datos or "cliente" not in datos:
        return jsonify ({"error": "Debe incluir los datos correctos"}), 400


    reserva_nueva = Reservas (
        cliente=datos['cliente'],
        litros=datos.get('litros', 0), 
        estado=datos.get('estado', 'pendiente'),
        fecha=datos.get ('fecha'),
    
    )

    db.session.add(reserva_nueva)
    db.session.commit()
    return jsonify(reserva_nueva.to_dict()), 201


@reservas_bp.route("/api/reservas/<int:reserva_id>", methods = ["DELETE"])
def delete_reservas(reserva_id):
    reserva = Reservas.query.get(reserva_id)

    if not reserva:
        return jsonify({"error": "Cliente no encontrado"}), 404
        
    
    db.session.delete(reserva)
    db.session.commit()
    return jsonify ({"Eliminado": "Reserva Eliminado"})

@reservas_bp.route("/api/reservas/<int:reserva_id>", methods = ["PUT"])
def actualizar_reserva (reserva_id):
    reserva = Reservas.query.get(reserva_id)

    
    if not reserva:
        return jsonify({"error":"Reserva no encontrada"}), 404

    datos = request.get_json()


    if "cliente" in datos:
        reserva.cliente = datos["cliente"]

    if "litros" in datos:
        reserva.litros = datos["litros"]

    if "estado" in datos:
        reserva.estado =datos["estado"]

    if "fecha" in datos:
        reserva.fecha = datos["fecha"]

    db.session.commit()
    return jsonify(reserva.to_dict()), 200
