import { Injectable } from '@nestjs/common';
import { RadarI } from './interfaces/radar.interface';
import { CoordenadaI } from './interfaces/coordenada.interface';
import { ScanI } from './interfaces/scan.interface';

@Injectable()
export class RadarService {
    crearLibro(radar: RadarI) {
        let protocols = radar["protocols"];
        let scans = radar["scan"];
        let coordinates: CoordenadaI[];
        let scansResult: ScanI[];

        // añadir for todo protocols

        switch (protocols[0] as any) {
            case "closest-enemies": // Se deberá priorizar el punto más cercano en el que haya enemigos.
                scansResult = closestEnemies(scans);
                break;
            // case "furthest-enemies": // Se deberá priorizar el punto más lejano en el que haya enemigos. ***>100m descarrar
            //     coordinates = furthestEnemies(scans);
            //     break;
            // case "assist-allies": // Deberan de priorizarse los puntos en los que exista algún aliado.
            //     coordinates = assistAllies(scans);
            //     break;
            // case "avoid-crossfire": // No debe de atacarse ningún punto en el que haya algún aliado.
            //     coordinates = avoidCrossfire(scans);
            //     break;
            case "prioritize-mech": // Debe de atacarse unm ech si se encuentra. En caso negativo, cualquier otro tipo deobjetivo será válido.
                scansResult = prioritizeMech(scans);
                break;
            case "avoid-mech": // No debe de atacarse ningún enemigo del tipom ech
                scansResult = avoidMech(scans);
                break;
            default:
                break;
        }

        //seleccionar objectivo
        return scansResult[0].coordinates;
    }
}

function closestEnemies(scans): ScanI[] { // Se deberá priorizar el punto más cercano en el que haya enemigos.
    let scansResult: ScanI[] = [];
    let coordinate: CoordenadaI;

    console.log("closest-enemies");
    //Se repite el primero y tiene q ser < 100
    coordinate = scans[0]["coordinates"]; // meto el primero 
    for (let i in scans) {
        if (distanciaPunto(coordinate) > distanciaPunto(scans[i]["coordinates"])) {
            scansResult.push(scans[i]);
            console.log(scans[i]);
        }
    }
    return coordinates;
}

function furthestEnemies(scans): any { // Se deberá priorizar el punto más lejano en el que haya enemigos. ***>100m descarrar
    let coordinates: CoordenadaI;

    console.log("furthest-enemies");
    //Se repite el primero y tiene q ser < 100
    coordinates = scans[0]["coordinates"]; // meto el primero
    for (let i in scans) {
        if ((distanciaPunto(coordinates) < distanciaPunto(scans[i]["coordinates"])) && distanciaPunto(scans[i]["coordinates"]) < 100) {
            coordinates = scans[i]["coordinates"];
            console.log(scans[i]);
        }
    }
    return coordinates;
}

function assistAllies(scans): any { // Deberan de priorizarse los puntos en los que exista algún aliado.
    let coordinates: CoordenadaI;

    console.log("assist-allies");
    for (let i in scans) {
        if (typeof scans[i]["allies"] !== "undefined") { // si existe
            coordinates = scans[i]["coordinates"];
            console.log(scans[i]);
        }
    }
    return coordinates;
}

function avoidCrossfire(scans): any { // No debe de atacarse ningún punto en el que haya algún aliado.
    let coordinates: CoordenadaI;

    console.log("avoid-crossfire");
    for (let i in scans) {
        if (typeof scans[i]["allies"] === "undefined") { // si no existe
            coordinates = scans[i]["coordinates"];
            console.log(scans[i]);
        }
    }
    return coordinates;
}

function prioritizeMech(scans): ScanI[] { // Debe de atacarse unm ech si se encuentra. En caso negativo, cualquier otro tipo deobjetivo será válido.
    let scansResult: ScanI[] = [];
    let scansResult2: ScanI[] = [];

    console.log("prioritize-mech");
    // coordinates = scans[0]["coordinates"]; // meto el primero por si no hay ningun ech
    for (let i in scans) {
        if (scans[i]["enemies"]["type"] === "mech") {
            scansResult.push(scans[i]);
            console.log(scans[i]);
        } else {
            scansResult2.push(scans[i]);
        }
    }
    scansResult.concat(scansResult2)

    return scansResult;
}

function avoidMech(scans): ScanI[] { // No debe de atacarse ningún enemigo del tipom ech
    let scansResult: ScanI[] = [];

    console.log("avoid-mech");
    for (let i in scans) {
        if (scans[i]["enemies"]["type"] !== "mech") {
            scansResult.push(scans[i]);
            console.log(scans[i]);
        }
    }
    return scansResult;
}

function distanciaPunto(coordinates: CoordenadaI): number {// d(a,b) = raiz (x2-x1)2 + (y2 - y1)2
    let origen: CoordenadaI;
    origen = { x: 0, y: 0 };
    console.log("La distancia es: " + Math.sqrt(Math.pow((coordinates.x - 0), 2) + Math.pow((coordinates.y - 0), 2)))
    return Math.sqrt(Math.pow((coordinates.x - 0), 2) + Math.pow((coordinates.y - 0), 2));
}