import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';

@Controller('radar')
export class RadarController {

    @Get()
    getAllLibros(): string {
        return "todos los libros";
    }
    @Post()
    crearLibro(): string {
        return "Crear un nuevo libro";
    }
    @Put(":id")
    modificarLibro(@Param("id") idLibro: string): string {
        return "Modificar un libro ${idLibro}";
    }
    @Delete()
    borrarLibro(): string {
        return "Borrar un libro";
    }

}
