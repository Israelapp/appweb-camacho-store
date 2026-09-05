from extensions import db

class Pagos (db.Model):
    id = db.Column (db.Integer, primary_key=True)
    cliente = db.Column(db.String(80), nullable=False)
    monto = db.Column (db.Float, default=0.0)
    fecha = db.Column (db.Date)
    metodo = db.Column (db.String(40), nullable=False)

    def to_dict(self):
        return{
            'id': self.id,
            'cliente': self.cliente,
            'monto': self.monto,
            'fecha': self.fecha,
            'metodo': self.metodo,
        }
