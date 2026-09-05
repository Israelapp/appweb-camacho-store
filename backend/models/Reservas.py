from extensions import db


class Reservas (db.Model):
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
    