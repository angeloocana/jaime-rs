// import { LineCounter } from 'chunking-streams';
import fs from 'fs';
import path from 'path';
import R from 'ramda';

interface IRotatedPosition {
    newX: number;
    newY: number;
    value: any;
}

export function createCsvTestFile(fileName: string) {
    const fullPath = path.join(__dirname, fileName);
    let data = '';
    for (let i = 0; i < 1000000; i++) {
        data += `${i}\n`;
    }

    fs.writeFile(fullPath, data, (err) => console.log(err));
}

export function getRotatedArrayToPrint(array: IRotatedPosition[]): string {
    return array.reduce((acc, p) => {
        return `${acc}${p.newX};${p.newY};${p.value} \n `;
    }, '');
}

export function getCsvData(angle, fileName: string) {
    const fullPath = path.join(__dirname, fileName);
    // let nChunk = 0;
    // let lines = 0;
    // const chunker = new LineCounter({
    //     numLines: 2,
    //     flushTail: false
    // });

    fs.createReadStream(fullPath, { encoding: 'utf-8' })
        .pipe(process.stdout)
        .on('error', (err) => console.log('onError', err))
        .on('end', () => console.log('ended'))
        .on('finish', () => console.log('finish'))
        .on('open', () => console.log('open'))
        .on('close', () => console.log('close'));

    // .pipe(chunker)
    // .on('data', chunk => {
    // try {
    //     chunk = chunk.toString();
    //     console.log(chunk);
    // console.log('nChunk: ' + nChunk);
    // const array = convertCsvToArray(chunk);
    // console.log('lines', lines);
    // const rotatedArray = getRotatedArrayToPrint(rotateArray(angle, array, lines));

    // fs.appendFile(fullPath + '_rotated.txt', rotatedArray, (err) => console.log(err));
    // console.log('array', array);
    // lines = lines + array.length;
    // nChunk++;
    //     } catch (e) {
    //         console.log('try error:', e);
    //     }
    // })
    //     .on('error', (err) => console.log('onError', err));
}

/**
 * Converts a csv line to an array
 */
export function convertCsvLine(line: string): string[] {
    return line.split(';');
}

export function convertCsvToArray(data: string): string[][] {
    return data.split('\n').filter(l => l.length > 0).map(convertCsvLine);
}

export function rotateByCosAndSin(cos, sin, x, y) {
    return {
        newX: (cos * x) - (sin * y),
        newY: (sin * x) + (cos * y)
    };
}

/**
 * Converts an angle like 45º and returns rad 0.785
 * @param angle
 */
export function getAngleToRad(angle) {
    return (angle * Math.PI) / 180;
}

export const getCos = R.memoize((angle) => Math.cos(getAngleToRad(angle)));

export const getSin = R.memoize((angle) => Math.sin(getAngleToRad(angle)));

/**
 * Rotate by angle
 * @param angle
 * @param x
 * @param y
 */
export const rotateByAngle = (angle, x, y) =>
    rotateByCosAndSin(getCos(angle), getSin(angle), x, y);

/**
 *
 * @param angle
 * @param array
 * @param startY the number of the first line in this chunk
 */
export function rotateArray(angle, array: any[][], startY): IRotatedPosition[] {
    return array.reduce((accLine, line, y) => {
        return accLine.concat(line.reduce((accRow, value, x) => {
            const { newX, newY } = rotateByAngle(angle, x + 1, y + 1 + startY);
            return accRow.concat({
                newX,
                newY,
                value
            });
        }, []));
    }, []);
}
