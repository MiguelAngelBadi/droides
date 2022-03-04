import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { radarDto } from './dto/radar';
import { RadarService } from './radar.service';

@Controller('radar')
export class RadarController {
    constructor(private readonly radarService: RadarService) { }

    @Post()
    crearLibro(@Body() radarDto: radarDto): object { // probar con DTO
        return this.radarService.obtenerPuntoADestruir(radarDto);
    }
}
