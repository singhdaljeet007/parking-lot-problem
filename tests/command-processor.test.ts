import { commandProcessor } from "../src/command-processor";

const carRegOne = 'KA-01-HH-1234';
const carRegTwo = 'KA-01-HH-9999';

describe('Empty Parking Lot', () => {
    test('create parking lot', () => {
        expect(commandProcessor('create_parking_lot' + ' 1')).toBe('Created parking lot with 1 slot')
    })
    test('park cars', () => {
        commandProcessor('create_parking_lot' + ' 2')
        expect(commandProcessor('park ' + carRegOne)).toBe('Allocated slot number: 1')
    })
    test('leave cars', () => {
        commandProcessor('create_parking_lot' + ' 2')
        expect(commandProcessor('leave ' + carRegTwo)).toBe(`Registration number ${carRegTwo} not found`)
    })
    test('get details', () => {
        commandProcessor('create_parking_lot' + ' 2')
        expect(commandProcessor('status')).toBe('No cars parked')
    })
})