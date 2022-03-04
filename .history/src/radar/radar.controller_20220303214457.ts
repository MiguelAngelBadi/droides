import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';

@Controller('radar')
export class RadarController {

    @Get()
    getAllLibros(): string {
        return "todos los libros";
    }
    @Post()
    crearLibro(@Body() radar: object): string { // probar con DTO
        return `Crear un nuevo libro ${radar["protocols"]}`;
    }
    @Put(":id")
    modificarLibro( @Param("id") idLibro: string): string {
        return `Modificar un libro ${idLibro}`;
    }
    @Delete()
    borrarLibro( @Param("id") idLibro: string): string {
        return "Borrar un libro";
    }

}
