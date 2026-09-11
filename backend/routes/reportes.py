from flask import Blueprint, jsonify
from models.Clientes import Clientes
from models.Reservas import Reservas
from models.Pagos import Pagos
from models.Producto import Producto


reportes_bp = Blueprint('reportes', __name__)

@reportes_bp.route("/api/reportes/resumen", methods=["GET"])
def resumen():
    total_clientes = len(Clientes.query.all())

    reservas = Reservas.query.all()
    pendientes = 0
    confirmadas = 0
    for reserva in reservas:
        if reserva.estado == "pendiente":
            pendientes = pendientes + 1
        if reserva.estado == "confirmada":
            confirmadas = confirmadas + 1

    pagos = Pagos.query.all()
    total_ingresos = sum(pago.monto for pago in pagos)   

    cantidades = Producto.query.all()
    total_stock = sum(cantidad.cantidad for cantidad in cantidades)    

    return jsonify({
        
        "total_clientes": total_clientes,
        "reservas_pendientes": pendientes,
        "reservas_confirmadas": confirmadas,
        "total_ingresos": total_ingresos,
        "total_stock": total_stock,
})