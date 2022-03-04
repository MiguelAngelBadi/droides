import { Injectable } from '@nestjs/common';
import { RadarI } from './interfaces/radar.interface';


@Injectable()
export class RadarService {
    buscarTodos(){
        return "Buscar todos los libros";
    }

    crearLibro(){
        return "Crear libro";
    }

    buscarLibro(){
        return "Un solo libro";
    }

    modificarLibro(){
        return "Modificar libro";
    }

    borrarLibro(){
        return "Borrar libro";
    }

}
