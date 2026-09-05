from flask import Blueprint,jsonify, request
from extensions import db
from models.Clientes import Clientes 

clientes_bp = Blueprint ('clientes', __name__)

@clientes_bp.route ("/api/cliente", methods = ["GET"])
def todo_clientes ():
    cliente_bd = Clientes.query.all()
    lista=[]
    for cliente in cliente_bd:
            lista.append(cliente.to_dict())
    return jsonify(lista)

@clientes_bp.route("/api/clientes", methods =["POST"])
def crear_nuevo ():
    datos = request.get_json()


    if not datos or "nombre" not in datos:
        return jsonify ({"error": "El nombre es obligatorio"}), 400
      
      
    nuevo_cliente = Clientes (
            nombre=datos['nombre'],
            telefono=datos.get('telefono'), 
            direccion=datos.get('direccion'),
            
        
        )
    
    db.session.add(nuevo_cliente)
    db.session.commit()
    return jsonify(nuevo_cliente.to_dict()), 201

@clientes_bp.route("/api/clientes/<int:cliente_id>", methods = ["PUT"])
def obtener_cliente (cliente_id):
    cliente = Clientes.query.get(cliente_id)

    if not cliente:
        return jsonify({"error": "Producto no encontrado"}), 404
   
    datos = request.get_json()
   
   
    if "nombre" in datos:
         cliente.nombre = datos["nombre"]
   
    if "telefono" in datos:
           cliente.telefono = datos["telefono"]
   
    if "direccion" in datos:
        cliente.direccion = datos["direccion"]

    
    db.session.commit()
    return jsonify(cliente.to_dict()), 200

@clientes_bp.route ("/api/clientes/<int:cliente_id>", methods =["DELETE"])
def delete_cliente (cliente_id):
    cliente = Clientes.query.get(cliente_id)

    if not cliente:
        return jsonify({"error": "Cliente no encontrado"}), 404
    

        
    db.session.delete(cliente)
    db.session.commit()
    return jsonify ({"Eliminado": "Cliente Eliminado"})
    