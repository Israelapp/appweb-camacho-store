# 💧 Camacho Store

Sistema de gestión para un negocio de recargas de agua, construido como proyecto full-stack real: nació para resolver una necesidad concreta del negocio familiar de mi familia en Venezuela.

## Sobre el proyecto

Camacho Store no es un ejercicio de portafolio genérico — es una aplicación pensada para uso real: gestionar reservas de pedidos de agua, inventario, clientes, pagos, y generar reportes exportables en PDF con estadísticas del negocio.

Lo construí después de completar el bootcamp de Desarrollo Full Stack en 4Geeks Academy, priorizando entender cada pieza a fondo (depurar errores reales, leer tracebacks, refactorizar el backend a una arquitectura más limpia cuando el proyecto creció) por encima de simplemente "que funcione".

## Funcionalidades

- 📋 **Reservas** — creación y seguimiento de pedidos por cliente y litros, con estado (pendiente / confirmada / cancelada)
- 📦 **Inventario** — gestión de productos, cantidades en stock y precios
- 👥 **Clientes** — base de datos de clientes con datos de contacto
- 💵 **Pagos** — registro de pagos por cliente, monto y método
- 📊 **Dashboard y Reportes** — estadísticas en vivo (clientes, reservas pendientes/confirmadas, ingresos, stock), medidor visual de stock, listado de órdenes recientes, y exportación de reporte a PDF con un clic
- 🎨 Identidad visual propia (color de marca `#006194`) aplicada de forma consistente en toda la interfaz

## Stack tecnológico

**Frontend**
- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- lucide-react (iconografía)

**Backend**
- Python + Flask
- SQLAlchemy (ORM)
- ReportLab (generación de PDF)
- Flask-CORS

**Infraestructura**
- Backend desplegado en Render (Gunicorn)
- Frontend desplegado en Vercel
- Git / GitHub (monorepo)

## Arquitectura

El backend está organizado con Flask Blueprints en lugar de un único `app.py`, separando responsabilidades:

```
backend/
├── app.py              # crea la app, registra los blueprints
├── extensions.py       # instancia compartida de SQLAlchemy
├── models/              # Producto, Reserva, Cliente, Pago
└── routes/              # productos, reservas, clientes, pagos, reportes, reportes_pdf
```

El frontend sigue la misma filosofía, organizado por dominio en vez de por tipo de archivo:

```
frontend/src/
├── app/
│   ├── page.tsx          # Dashboard
│   ├── reservas/
│   ├── inventario/
│   ├── clientes/
│   ├── pago/
│   └── reportes/
└── components/
    ├── Sidebar.tsx
    ├── StatCard.tsx / StockGauge.tsx / OrdenRow.tsx
    ├── reservas/   (Card + Form)
    ├── inventario/ (Card + Form)
    ├── clientes/   (Card + Form)
    ├── pagos/      (Card + Form)
    └── reportes/   (DescargarPdfBoton)
```

## Demo en vivo

- 🔗 Frontend: (https://appweb-camacho-store.vercel.app/)
- 🔗 API Backend: https://appweb-camacho-store.onrender.com

## Cómo correrlo en local

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate      # Windows
pip install -r requirements.txt
python app.py
```

### Frontend

```bash
cd frontend
npm install
```

Crea un archivo `.env.local` en `frontend/`:

```
NEXT_PUBLIC_API_URL=http://127.0.0.1:5000
```

```bash
npm run dev
```

## Próximos pasos

- [ ] Migrar de SQLite a PostgreSQL (Supabase) para persistencia real de datos en producción
- [ ] Validaciones de datos (frontend y backend) para evitar cantidades o montos negativos
- [ ] Autenticación para acceso multiusuario

## Autor

**Israel Castillo** — Junior Full Stack Developer
Peñafiel, España 🇪🇸
[GitHub](https://github.com/Israelapp)