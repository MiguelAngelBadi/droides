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
    @Put()
    modificarLibro(): string {
        return "Modificar un libro";
    }
    @Delete()
    borrarLibro(): string {
        return "Borrar un libro";
    }

}
