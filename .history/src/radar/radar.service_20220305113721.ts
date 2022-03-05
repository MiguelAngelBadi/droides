import { Injectable } from '@nestjs/common';
import { RadarI } from './interfaces/radar.interface';
import { CoordenadaI } from './interfaces/coordenada.interface';
import { ScanI } from './interfaces/scan.interface';

@Injectable()
export class RadarService {
    obtenerPuntoADestruir(radar: RadarI) {
        let protocols = radar["protocols"];
        let coordinatesResult: CoordenadaI;
        let scansResult: ScanI[];
        let scans = radar["scan"];

        scansResult = scans as ScanI[];

        for (let i in protocols) {
            switch (protocols[i]) {
                case "closest-enemies": // Se deberá priorizar el punto más cercano en el que haya enemigos.
                    scansResult = closestEnemies(scansResult);
                    break;
                case "furthest-enemies": // Se deberá priorizar el punto más lejano en el que haya enemigos. ***>100m descartar
                    scansResult = furthestEnemies(scansResult);
                    break;
                case "assist-allies": // Deberan de priorizarse los puntos en los que exista algún aliado.
                    scansResult = assistAllies(scansResult);
                    break;
                case "avoid-crossfire": // No debe de atacarse ningún punto en el que haya algún aliado.
                    scansResult = avoidCrossfire(scansResult);
                    break;
                case "prioritize-mech": // Debe de atacarse unm ech si se encuentra. En caso negativo, cualquier otro tipo deobjetivo será válido.
                    scansResult = prioritizeMech(scansResult);
                    break;
                case "avoid-mech": // No debe de atacarse ningún enemigo del tipom ech
                    scansResult = avoidMech(scansResult);
                    break;
                default:
                    break;
            }
        }

        coordinatesResult = seleccionarObjetivo(scansResult);
        return coordinatesResult;
    }
}

let seleccionarObjetivo = (scans: ScanI[]): CoordenadaI => {
    let coordinate: CoordenadaI;

    for (let i in scans) {
        if (distanciaPunto(scans[i]["coordinates"] as CoordenadaI) < 100) {
            coordinate = scans[i].coordinates as CoordenadaI;
            break;
        }
    }

    return coordinate;
}

function closestEnemies(scans: ScanI[]): ScanI[] { // Se deberá priorizar el punto más cercano en el que haya enemigos. 
    let scansResult: ScanI[] = [];

    console.log("closest-enemies");
    scansResult = scans.sort((obj1, obj2) => {
        if (distanciaPunto(obj1.coordinates as CoordenadaI) > distanciaPunto(obj2.coordinates as CoordenadaI)) {
            return 1;
        }

        if (distanciaPunto(obj1.coordinates as CoordenadaI) < distanciaPunto(obj2.coordinates as CoordenadaI)) {
            return -1;
        }

        return 0;
    });

    return scansResult;
}

function furthestEnemies(scans: ScanI[]): ScanI[] { // Se deberá priorizar el punto más lejano en el que haya enemigos. 
    let scansResult: ScanI[];

    scansResult = [];

    console.log("furthest-enemies");
    scansResult = scans.sort((obj1, obj2) => {
        if (distanciaPunto(obj1.coordinates as CoordenadaI) > distanciaPunto(obj2.coordinates as CoordenadaI)) {
            return -1;
        }

        if (distanciaPunto(obj1.coordinates as CoordenadaI) < distanciaPunto(obj2.coordinates as CoordenadaI)) {
            return 1;
        }

        return 0;
    });

    return scansResult;
}

function assistAllies(scans: ScanI[]): any { // Deberan de priorizarse los puntos en los que exista algún aliado.
    let scansResult: ScanI[];
    let scansResult2: ScanI[];

    scansResult = [];
    scansResult2 = [];

    console.log("assist-allies");
    for (let i in scans) {
        if (typeof scans[i]["allies"] !== "undefined") { // si existe
            scansResult.push(scans[i]);
            // console.log(scans[i]);
        } else {
            scansResult2.push(scans[i]);
        }
    }
    Array.prototype.push.apply(scansResult, scansResult2);

    return scansResult;
}

function avoidCrossfire(scans: ScanI[]): ScanI[] { // No debe de atacarse ningún punto en el que haya algún aliado.
    let scansResult: ScanI[];

    scansResult = [];

    console.log("avoid-crossfire");
    for (let i in scans) {
        if (typeof scans[i]["allies"] === "undefined") { // si no existe
            scansResult.push(scans[i]);
            // console.log(scans[i]);
        }
    }
    return scansResult;
}

function prioritizeMech(scans: ScanI[]): ScanI[] { // Debe de atacarse unm ech si se encuentra. En caso negativo, cualquier otro tipo deobjetivo será válido.
    let scansResult: ScanI[];
    let scansResult2: ScanI[];

    scansResult = [];
    scansResult2 = [];

    console.log("prioritize-mech");
    for (let i in scans) {
        if (scans[i]["enemies"]["type"] === "mech") {
            scansResult.push(scans[i]);
            // console.log(scans[i]);
        } else {
            scansResult2.push(scans[i]);
        }
    }
    Array.prototype.push.apply(scansResult, scansResult2);

    return scansResult;
}

function avoidMech(scans: ScanI[]): ScanI[] { // No debe de atacarse ningún enemigo del tipom ech
    let scansResult: ScanI[];

    scansResult = [];

    console.log("avoid-mech");
    for (let i in scans) {
        if (scans[i]["enemies"]["type"] !== "mech") {
            scansResult.push(scans[i]);
            // console.log(scans[i]);
        }
    }
    return scansResult;
}

function distanciaPunto(coordinates: CoordenadaI): number {// d(a,b) = raiz (x2-x1)2 + (y2 - y1)2
    let origen: CoordenadaI;
    let distancia: number;

    origen = { x: 0, y: 0 };
    // console.log("La distancia es: " + Math.sqrt(Math.pow((coordinates.x - 0), 2) + Math.pow((coordinates.y - 0), 2)))

    distancia = Math.sqrt(Math.pow((coordinates.x - origen.x), 2) + Math.pow((coordinates.y - origen.y), 2));

    return distancia;
}