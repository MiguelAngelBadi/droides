import { Injectable } from '@nestjs/common';
import { RadarI } from './interfaces/radar.interface';


@Injectable()
export class RadarService {
    // buscarTodos(){
    //     return "Buscar todos los libros";
    // }

    crearLibro(radar: RadarI) {

        let protocols = `${radar["protocols"]}`;

        switch (protocols) {
            case "closest-enemies": // Se deberá priorizar el punto más cercano en el que haya enemigos.
                console.log("closest-enemies");
                break;
            case "furthest-enemies": // Se deberá priorizar el punto más lejano en el que haya enemigos. >100m descarrar
                console.log("closest-enemies");
                break;
            case "assist-allies": // Deberan de priorizarse los puntos en los que exista algún aliado.
                console.log("closest-enemies");
                break;
            case "avoid-crossfire": // No debe de atacarse ningún punto en el que haya algún aliado.
                console.log("closest-enemies");
                break;
            case "prioritize-mech": // Debe de atacarse unm ech si se encuentra. En caso negativo, cualquier otro tipo deobjetivo será válido.
                console.log("closest-enemies");
                break;
            case "avoid-mech": // No debe de atacarse ningún enemigo del tipom ech
                console.log("closest-enemies");
                break;

            default:
                break;
        }

        return `protocols: ${radar["protocols"]} ` +
            `scan.coordinates: ${radar["scan"]["coordinates"]} ` +
            `scan.enemies: ${radar["scan"]["enemies"]} `;
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
