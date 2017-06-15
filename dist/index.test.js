'use strict';

var _ptzAssert = require('ptz-assert');

var assert = _interopRequireWildcard(_ptzAssert);

var _index = require('./index');

var RS = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('jaime-rs', function () {
    describe('getCsvData', function () {
        it('reads', function () {
            var data = RS.getCsvData('../src/test.csv');
            var array = RS.convertCsvToArray(data);
            console.log(array);
            assert.ok(array);
        });
    });
    describe('rotateByCosAndSin', function () {
        it('x: 2, y: 3 => newX: -0.71, newY: 3.55', function () {
            var newPosition = RS.rotateByCosAndSin(0.71, 0.71, 2, 3);
            assert.equal(newPosition.newX, -0.71, 'new x');
            assert.equal(newPosition.newY, 3.55, 'new y');
        });
    });
    describe('rotateByAngle', function () {
        it('x: 2, y: 3 => newX: -0.71, newY: 3.55', function () {
            var newPosition = RS.rotateByAngle(45, 2, 3);
            assert.equal(newPosition.newX, -0.7071067811865472, 'new x');
            assert.equal(newPosition.newY, 3.5355339059327378, 'new y');
        });
    });
    describe('rotateArray', function () {
        it('rotate 45º [[2, 3], [4, 5]]', function () {
            var array = [[2, 3], [4, 5]];
            var expectedArray = [{ newX: 1.1102230246251565e-16, newY: 1.414213562373095, value: 2 }, { newX: 0.7071067811865477, newY: 2.1213203435596424, value: 3 }, { newX: -0.7071067811865474, newY: 2.121320343559643, value: 4 }, { newX: 2.220446049250313e-16, newY: 2.82842712474619, value: 5 }];
            var rotatedArray = RS.rotateArray(45, array);
            assert.deepEqual(rotatedArray, expectedArray);
        });
    });
});
//# sourceMappingURL=index.test.js.map
//# sourceMappingURL=index.test.js.map