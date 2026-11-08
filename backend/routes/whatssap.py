import os
from twilio.rest import Client

def enviar_alerta_whatsapp(cliente, litros, total, fecha):
    account_sid = os.environ.get("TWILIO_ACCOUNT_SID")
    auth_token = os.environ.get("TWILIO_AUTH_TOKEN")
    
    # Número remitente de WhatsApp (Para pruebas usas el sandbox de Twilio, 
    # y para producción el número oficial de tu empresa homologado por Meta)
    from_whatsapp = os.environ.get("TWILIO_WHATSAPP_FROM", "whatsapp:+14155238886")
    
    # Tu número personal o el de la empresa que recibirá la alerta (ej: whatsapp:+34600000000)
    to_whatsapp = os.environ.get("TWILIO_WHATSAPP_TO")

    if not account_sid or not auth_token or not to_whatsapp:
        print("⚠️ Faltan credenciales de Twilio en el entorno.")
        return

    try:
        client = Client(account_sid, auth_token)
        mensaje_cuerpo = (
            f"💧 *¡Nueva Reserva en Camacho Store!*\n\n"
            f"👤 *Cliente:* {cliente}\n"
            f"📊 *Litros:* {litros}L\n"
            f"💰 *Total:* ${total} USD\n"
            f"📅 *Entrega:* {fecha}"
        )
        
        message = client.messages.create(
            body=mensaje_cuerpo,
            from_=from_whatsapp,
            to=to_whatsapp
        )
        print("✅ Mensaje de WhatsApp enviado con éxito. SID:", message.sid)
    except Exception as e:
        print("❌ Error al enviar notificación de WhatsApp:", e)