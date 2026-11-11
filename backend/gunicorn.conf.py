# gunicorn.conf.py
bind = "0.0.0.0:10000"
workers = 1         # Mantener en 1 para la capa gratuita de Render y evitar consumo excesivo de RAM
threads = 2
timeout = 120       # Dar más margen de tiempo a las peticiones con la IA
keepalive = 5