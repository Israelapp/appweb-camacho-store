 export interface Reserva{
    id: number,
    cliente: string,
    litros: number, 
    estado: string,
    fecha: string | null,
}

export interface Producto {
    id:number,
    nombre: string,
    cantidad: number,
    precio:number,

}
