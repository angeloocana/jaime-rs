import * as assert from 'ptz-assert';
import * as RS from './index';

describe('jaime-rs', () => {
    describe('getCsvData', () => {
        it('reads', () => {
            const data = RS.getCsvData('../src/test.csv');
            const array = RS.convertCsvToArray(data);
            console.log(array);
            assert.ok(array);
        });
    });

    describe('rotateByCosAndSin', () => {
        it('x: 2, y: 3 => newX: -0.71, newY: 3.55', () => {
            const newPosition = RS.rotateByCosAndSin(0.71, 0.71, 2, 3);
            assert.equal(newPosition.newX, -0.71, 'new x');
            assert.equal(newPosition.newY, 3.55, 'new y');
        });
    });

    describe('rotateByAngle', () => {
        it('x: 2, y: 3 => newX: -0.71, newY: 3.55', () => {
            const newPosition = RS.rotateByAngle(45, 2, 3);
            assert.equal(newPosition.newX, -0.7071067811865472, 'new x');
            assert.equal(newPosition.newY, 3.5355339059327378, 'new y');
        });
    });

    describe('rotateArray', () => {
        it('rotate 45º [[2, 3], [4, 5]]', () => {
            const array = [
                [2, 3],
                [4, 5]
            ];

            const expectedArray = [
                { newX: 1.1102230246251565e-16, newY: 1.414213562373095, value: 2 },
                { newX: 0.7071067811865477, newY: 2.1213203435596424, value: 3 },
                { newX: -0.7071067811865474, newY: 2.121320343559643, value: 4 },
                { newX: 2.220446049250313e-16, newY: 2.82842712474619, value: 5 }
            ];

            const rotatedArray = RS.rotateArray(45, array);

            assert.deepEqual(rotatedArray, expectedArray);
        });
    });
});
