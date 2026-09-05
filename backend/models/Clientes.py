from extensions import db

class Clientes (db.Model):
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

