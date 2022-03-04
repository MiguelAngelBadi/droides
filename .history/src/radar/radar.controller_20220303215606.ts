import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { radarDto } from './dto/radar';
import { RadarService } from './radar.service';

@Controller('radar')
export class RadarController {
    constructor(private readonly radarService: RadarService){}

    @Get()
    todosLibros(): string {
        return this.radarService.buscarTodos();
    }


    @Post()
    crearLibro(@Body() radar: radarDto): string { // probar con DTO
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
