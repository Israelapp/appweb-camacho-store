from extensions import db


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


