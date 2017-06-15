'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.rotateByAngle = exports.getSin = exports.getCos = undefined;
exports.getCsvData = getCsvData;
exports.convertCsvLine = convertCsvLine;
exports.convertCsvToArray = convertCsvToArray;
exports.rotateByCosAndSin = rotateByCosAndSin;
exports.getAngleToRad = getAngleToRad;
exports.rotateArray = rotateArray;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCsvData(fileName) {
    var fullPath = _path2.default.join(__dirname, fileName);
    return _fs2.default.readFileSync(fullPath, 'utf-8');
}
/**
 * Converts a csv line to an array
 */
function convertCsvLine(line) {
    return line.split(';');
}
function convertCsvToArray(data) {
    return data.split('\n').map(convertCsvLine);
}
function rotateByCosAndSin(cos, sin, x, y) {
    return {
        newX: cos * x - sin * y,
        newY: sin * x + cos * y
    };
}
/**
 * Converts an angle like 45º and returns rad 0.785
 * @param angle
 */
function getAngleToRad(angle) {
    return angle * Math.PI / 180;
}
var getCos = exports.getCos = _ramda2.default.memoize(function (angle) {
    return Math.cos(getAngleToRad(angle));
});
var getSin = exports.getSin = _ramda2.default.memoize(function (angle) {
    return Math.sin(getAngleToRad(angle));
});
/**
 * Rotate by angle
 * @param angle
 * @param x
 * @param y
 */
var rotateByAngle = exports.rotateByAngle = function rotateByAngle(angle, x, y) {
    return rotateByCosAndSin(getCos(angle), getSin(angle), x, y);
};
function rotateArray(angle, array) {
    return array.reduce(function (accLine, line, y) {
        return accLine.concat(line.reduce(function (accRow, value, x) {
            var _rotateByAngle = rotateByAngle(angle, x + 1, y + 1),
                newX = _rotateByAngle.newX,
                newY = _rotateByAngle.newY;

            return accRow.concat({
                newX: newX,
                newY: newY,
                value: value
            });
        }, []));
    }, []);
}
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map