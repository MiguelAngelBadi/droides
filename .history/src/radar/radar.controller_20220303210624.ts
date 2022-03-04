import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';

@Controller('radar')
export class RadarController {

    @Get()
    getAllLibros(): string {
        return "todos los libros";
    }

}
