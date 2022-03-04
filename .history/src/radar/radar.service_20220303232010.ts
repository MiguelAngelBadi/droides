import { Injectable } from '@nestjs/common';
import { RadarI } from './interfaces/radar.interface';


@Injectable()
export class RadarService {
    // buscarTodos(){
    //     return "Buscar todos los libros";
    // }

    crearLibro(radar: RadarI) {

        let protocols = `${radar["protocols"]}`;
        let scans = `${radar["scan"]}`;

        switch (protocols) {
            case "closest-enemies": // Se deberá priorizar el punto más cercano en el que haya enemigos.
                console.log("closest-enemies");
                break;
            case "furthest-enemies": // Se deberá priorizar el punto más lejano en el que haya enemigos. >100m descarrar
                console.log("furthest-enemies");
                break;
            case "assist-allies": // Deberan de priorizarse los puntos en los que exista algún aliado.
                console.log("assist-allies");
                break;
            case "avoid-crossfire": // No debe de atacarse ningún punto en el que haya algún aliado.
                console.log("avoid-crossfire");
                break;
            case "prioritize-mech": // Debe de atacarse unm ech si se encuentra. En caso negativo, cualquier otro tipo deobjetivo será válido.
                console.log("prioritize-mech");
                break;
            case "avoid-mech": // No debe de atacarse ningún enemigo del tipom ech
                console.log("avoid-mech");
                for (const key in object) {
                    if (Object.prototype.hasOwnProperty.call(object, key)) {
                        const element = object[key];
                        
                    }
                }
                break;

            default:
                break;
        }

        return `protocols: ${radar["protocols"]} ` +
            `scan.coordinates: ${radar["scan"][0]["coordinates"]["x"]} ` +
            `scan.enemies: ${radar["scan"][0]["enemies"]["type"]} `;
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
