import { Injectable } from '@nestjs/common';
import { RadarI } from './interfaces/radar.interface';


@Injectable()
export class RadarService {
    // buscarTodos(){
    //     return "Buscar todos los libros";
    // }

    crearLibro(radar: RadarI){
        return `protocols: ${radar["protocols"]}`+
        `scan.coordinates: ${radar["scan"]["coordinates"]}`+
        `scan.enemies: ${radar["scan"]["enemies"]}`;
    }

    // buscarLibro(){
    //     return "Un solo libro";
    // }

    // modificarLibro(){
    //     return "Modificar libro";
    // }

    // borrarLibro(){
    //     return "Borrar libro";
    // }

}
