import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { radarDto } from './dto/radar';
import { RadarService } from './radar.service';

@Controller('radar')
export class RadarController {
    constructor(private readonly radarService: RadarService) { }

    @Get()
    todosLibros(): string {
        return this.radarService.buscarTodos();
    }


    @Post()
    crearLibro(@Body() radarDto: radarDto): string { // probar con DTO
        return this.radarService.crearLibro(radarDto);
        return `Crear un nuevo libro ${radar["protocols"]}`;
    }
    @Put(":id")
    modificarLibro(@Param("id") idLibro: string): string {
        return `Modificar un libro ${idLibro}`;
        // return this.radarService.modificarLibro(idLibro);
    }
    @Delete()
    borrarLibro(@Param("id") idLibro: string): string {
        return "Borrar un libro";
        // return this.radarService.borrarLibro(idLibro);
    }

}
