from flask import Blueprint, jsonify, request
from extensions import db
from models.Producto import Producto


productos_bp = Blueprint('productos', __name__)

@productos_bp.route("/api/inventario", methods=["GET"])
def obtener_inventario():
    productos_bd = Producto.query.all()
    lista =[]
    for producto in productos_bd:
        lista.append(producto.to_dict())
    return jsonify(lista)


@productos_bp.route("/api/inventario", methods =['Post'])
def crear_producto():
    datos = request.get_json()


    if not datos or "nombre" not in datos:
        return jsonify ({"error": "El nombre es obligatorio"}), 400


    nuevo = Producto (
        nombre=datos['nombre'],
        cantidad=datos.get('cantidad', 0),
        precio=datos.get('precio', 0.0),
        
    )

    db.session.add(nuevo)
    db.session.commit()
    return jsonify(nuevo.to_dict()), 201

@productos_bp.route("/api/inventario/<int:producto_id>", methods=["PUT"])

def obtener_uno(producto_id):
    producto = Producto.query.get(producto_id)

   

    if not producto:
        return jsonify({"error": "Producto no encontrado"}), 404

    datos = request.get_json()


    if "nombre" in datos:
        producto.nombre = datos["nombre"]

    if "cantidad" in datos:
        producto.cantidad = datos["cantidad"]

    if "precio" in datos:
        producto.precio = datos["precio"]

    db.session.commit()
    return jsonify(producto.to_dict()), 200

@productos_bp.route("/api/inventario/<int:producto_id>", methods =["DELETE"])

def eliminar_producto(producto_id):
    producto = Producto.query.get (producto_id)

    if not producto:
        return jsonify({"error": "Producto no encontrado"}), 404
    

    db.session.delete(producto)
    db.session.commit()
    return jsonify ({"Eliminado": "Producto Eliminado"})
