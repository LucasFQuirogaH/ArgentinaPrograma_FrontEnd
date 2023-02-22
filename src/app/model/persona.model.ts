// Modelo
export class Persona{
    id: number;
    nombreCompleto: string;
    profesion: string;
    ubicacion: string;
    fotoPerfil: string;
    fotoPortada: string;

    constructor(nombreCompleto: string, profesion: string, ubicacion: string, fotoPerfil: string, fotoPortada: string){
        this.nombreCompleto = nombreCompleto;
        this.profesion = profesion;
        this.ubicacion = ubicacion;
        this.fotoPerfil = fotoPerfil;
        this.fotoPortada = fotoPortada;
    }
}