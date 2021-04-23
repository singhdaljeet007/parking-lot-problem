import { commandProcessor } from "../src/command-processor";


const carRegOne = 'KA-01-HH-1234';
const carRegTwo = 'KA-01-HH-9999';
const carRegThree = 'KA-01-BB-0001';
const carRegFour = 'KA-01-HH-7777';

describe('Failure Cases', () => {
    test('Not parking Lot', () => {
        expect(commandProcessor('leave abcd')).toBe('No Parking Lot Created')
        expect(commandProcessor('park xyz')).toBe('No Parking Lot Created')
        expect(commandProcessor('status')).toBe('No Parking Lot Created')
    })
    test('wrong initialisation parking lot', () => {
        expect(commandProcessor('create_parking_lot' + ' 0')).toBe('Invalid slots')
        expect(commandProcessor('')).toBe('Invalid input')
    })
    test('incorrect params passed', () => {
        commandProcessor('create_parking_lot' + ' 2')
        expect(commandProcessor('leave abcd')).toBe('Registration number abcd not found')
        expect(commandProcessor('park')).toBe('No Registration no provided')
    })
})

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

describe('Full Parking Lot', () => {
    test('create parking lot', () => {
        expect(commandProcessor('create_parking_lot' + ' 3')).toBe('Created parking lot with 3 slots')
    })
    test('park cars', () => {
        expect(commandProcessor('park ' + carRegOne)).toBe('Allocated slot number: 1')
        expect(commandProcessor('park ' + carRegTwo)).toBe('Allocated slot number: 2')
        expect(commandProcessor('park ' + carRegThree)).toBe('Allocated slot number: 3')
        expect(commandProcessor('park ' + carRegFour)).toBe('Sorry, parking lot is full')
    })
    test('leave cars', () => {
        expect(commandProcessor('leave ' + carRegThree+' 5')).toBe(`Registration number ${carRegThree} with Slot Number 3 is free with Charge 50`)
    })
})