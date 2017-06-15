import fs from 'fs';
import path from 'path';
import R from 'ramda';
export function getCsvData(fileName) {
    const fullPath = path.join(__dirname, fileName);
    return fs.readFileSync(fullPath, 'utf-8');
}
/**
 * Converts a csv line to an array
 */
export function convertCsvLine(line) {
    return line.split(';');
}
export function convertCsvToArray(data) {
    return data.split('\n').map(convertCsvLine);
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
export const rotateByAngle = (angle, x, y) => rotateByCosAndSin(getCos(angle), getSin(angle), x, y);
export function rotateArray(angle, array) {
    return array.reduce((accLine, line, y) => {
        return accLine.concat(line.reduce((accRow, value, x) => {
            const { newX, newY } = rotateByAngle(angle, x + 1, y + 1);
            return accRow.concat({
                newX,
                newY,
                value
            });
        }, []));
    }, []);
}
//# sourceMappingURL=index.js.map