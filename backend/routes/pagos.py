from flask import Blueprint, jsonify, request
from extensions import db
from models.Pagos import Pagos

pagos_bp = Blueprint ('pagos', __name__)

@pagos_bp.route ("/api/pagos", methods =['GET'])
def obtener_pago():
    pago_bd= Pagos.query.all()
    lista = []
    for pago in pago_bd:
        lista.append(pago.to_dict())
    return jsonify (lista)


@pagos_bp.route ("/api/pagos", methods=['POST'])
def realizar_pago():
    datos = request.get_json()

    if not datos or "cliente" not in datos:
        return jsonify ({"error": "Debe incluir los datos correctos"}), 400

    if not datos or 'monto' not in datos:
        return jsonify ({"error": "El monto es obligatorio"}), 400

    nuevo = Pagos (
        cliente=datos ['cliente'],
        monto= datos.get ('monto',0 ),
        metodo= datos.get ('metodo', ""),

    )

    db.session.add (nuevo)
    db.session.commit ()
    return jsonify (nuevo.to_dict()),201 

@pagos_bp.route("/api/pagos/<int:pago_id>", methods = ["PUT"])
def actualizar_pago(pago_id):
    pago = Pagos.query.get(pago_id)

    if not pago:
        return jsonify ({"error": "Pago no encontrado"}), 404

    datos = request.get_json()

    if "cliente" in datos:
        pago.cliente = datos["cliente"]

    if "monto" in datos:
        pago.monto = datos["monto"]

    if "metodo" in datos:
        pago.metodo = datos ["metodo"]

    if "fecha" in datos:
        pago.fecha = datos ["fecha"]

    db.session.commit()
    return jsonify(pago.to_dict()),200

@pagos_bp.route ("/api/pagos/<int:pago_id>", methods = ["DELETE"])
def delete_pago(pago_id):
    pago = Pagos.query.get(pago_id)


    if not pago:
        return jsonify ({"error": "Pago no encontrado"}), 404

    db.session.delete(pago)
    db.session.commit()
    return jsonify({"Eliminando": "Pago Eliminado"})