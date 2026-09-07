from flask import Blueprint, Response
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
import io
from models.Clientes import Clientes
from models.Reservas import Reservas
from models.Pagos import Pagos

reportes_pdf_bp = Blueprint('reportes_pdf', __name__)

@reportes_pdf_bp.route("/api/reportes/resumen/pdf", methods=["GET"])
def resumen_pdf():
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

    buffer = io.BytesIO()
    documento = SimpleDocTemplate(buffer, pagesize=letter)
    estilos = getSampleStyleSheet()

    contenido = []
    contenido.append(Paragraph("Reporte de Camacho Store", estilos['Title']))
    contenido.append(Paragraph(f"Total de clientes: {total_clientes}", estilos['Normal']))
    contenido.append(Paragraph(f"Reservas pendientes: {pendientes}", estilos['Normal']))
    contenido.append(Paragraph(f"Reservas confirmadas: {confirmadas}", estilos['Normal']))
    contenido.append(Paragraph(f"Total de ingresos: ${total_ingresos}", estilos['Normal']))
    documento.build(contenido)
    buffer.seek(0)

    return Response(buffer.read(),
        mimetype="application/pdf", headers={"Content-Disposition": "attachment; filename=reporte.pdf"})