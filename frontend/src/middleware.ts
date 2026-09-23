import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const adminToken = request.cookies.get("admin_token")?.value;
  const { pathname } = request.nextUrl;

  const esRutaAdmin = pathname.startsWith("/admin");
  const esLoginAdmin = pathname === "/admin/login";

  // Si intenta entrar a cualquier ruta /admin sin estar logueado (y no está en /admin/login)
  if (esRutaAdmin && !esLoginAdmin && !adminToken) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Si ya está logueado e intenta volver a entrar a /admin/login, mandarlo directo al dashboard
  if (esLoginAdmin && adminToken) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};