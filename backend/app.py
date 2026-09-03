from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///inventario.db'

db =SQLAlchemy(app)

class Producto (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80), nullable=False)
    cantidad = db.Column(db.Integer, default=0)
    precio = db.Column(db.Float, default=0.0)




    def to_dict(self):
        return{
            'id': self.id,
            'nombre':self.nombre,
            'cantidad': self.cantidad,
            'precio': self.precio
        }

    def valor_total(self):
        return self.cantidad * self.precio   

class Reserva (db.Model):
    id = db.Column (db.Integer, primary_key=True)
    cliente = db.Column(db.String(80), nullable=False)
    fecha = db.Column (db.Date)
    litros = db.Column(db.Integer, default=0)
    estado = db.Column (db.String(80), nullable=False,  default ="pendiente")

    def to_dict(self):
        return{
            'id': self.id,
            'cliente': self.cliente,
            'litros': self.litros,
            'estado': self.estado,
            'fecha': self.fecha,
        }
    
class Cliente (db.Model):
    id = db.Column (db.Integer, primary_key=True)
    nombre = db.Column (db.String (80), nullable=False)
    telefono = db.Column (db.String(80), nullable=False)
    direccion = db.Column (db.String (80),  nullable=False)

    def to_dict (self):
        return{
            'id': self.id,
            'nombre': self.nombre,
            'telefono': self.telefono,
            'direccion': self.direccion,
        }


@app.route("/")
def home():
    return "¡Hola! Israel Castillo 🎉"

@app.route("/api/inventario", methods=["GET"])
def obtener_inventario():
    productos_bd = Producto.query.all()
    lista =[]
    for producto in productos_bd:
        lista.append(producto.to_dict())
    return jsonify(lista)


@app.route ("/api/inventario", methods =['Post'])
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

@app.route("/api/inventario/<int:producto_id>", methods=["PUT"])

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

@app.route ("/api/inventario/<int:producto_id>", methods =["DELETE"])
def eliminar_producto(producto_id):
    producto = Producto.query.get (producto_id)

    if not producto:
        return jsonify({"error": "Producto no encontrado"}), 404
    

    db.session.delete(producto)
    db.session.commit()
    return jsonify ({"Eliminado": "Producto Eliminado"})

@app.route ("/api/reservas", methods = ["GET"])
def obtener_reserva():
    Reserva_db  = Reserva.query.all()
    lista =[]
    for reserva in Reserva_db:
        lista.append(reserva.to_dict())
    return jsonify(lista)


@app.route ("/api/reservas", methods =['Post'])
def crear_reserva():
    datos = request.get_json()


    if not datos or "litros" not in datos:
        return jsonify ({"error": "Los litros son obligatorio"}), 400
    if not datos or "cliente" not in datos:
        return jsonify ({"error": "Debe incluir los datos correctos"}), 400


    reserva_nueva = Reserva (
        cliente=datos['cliente'],
        litros=datos.get('litros', 0), 
        estado=datos.get('estado', 'pendiente'),
        fecha=datos.get ('fecha'),
    
    )

    db.session.add(reserva_nueva)
    db.session.commit()
    return jsonify(reserva_nueva.to_dict()), 201


@app.route ("/api/reservas/<int:reserva_id>", methods = ["DELETE"])
def delete_reservas(reserva_id):
    reserva = Reserva.query.get(reserva_id)

    if not reserva:
        return jsonify({"error": "Cliente no encontrado"}), 404
        
    
    db.session.delete(reserva)
    db.session.commit()
    return jsonify ({"Eliminado": "Reserva Eliminado"})

@app.route ("/api/reservas/<int:reserva_id>", methods = ["PUT"])
def actualizar_reserva (reserva_id):
    reserva = Reserva.query.get(reserva_id)

    
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

@app.route ("/api/cliente", methods = ["GET"])
def todo_clientes ():
    cliente_bd = Cliente.query.all()
    lista=[]
    for cliente in cliente_bd:
            lista.append(cliente.to_dict())
    return jsonify(lista)

@app.route ("/api/clientes", methods =["POST"])
def crear_nuevo ():
    datos = request.get_json()


    if not datos or "nombre" not in datos:
        return jsonify ({"error": "El nombre es obligatorio"}), 400
      
      
    nuevo_cliente = Cliente (
            nombre=datos['nombre'],
            telefono=datos.get('telefono'), 
            direccion=datos.get('direccion'),
            
        
        )
    
    db.session.add(nuevo_cliente)
    db.session.commit()
    return jsonify(nuevo_cliente.to_dict()), 201

@app.route ("/api/clientes/<int:cliente_id>", methods = ["PUT"])
def obtener_cliente (cliente_id):
    cliente = Cliente.query.get(cliente_id)

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

@app.route ("/api/clientes/<int:cliente_id>", methods =["DELETE"])
def delete_cliente (cliente_id):
    cliente = Cliente.query.get(cliente_id)

    if not cliente:
        return jsonify({"error": "Cliente no encontrado"}), 404
    

        
    db.session.delete(cliente)
    db.session.commit()
    return jsonify ({"Eliminado": "Cliente Eliminado"})
    


with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)