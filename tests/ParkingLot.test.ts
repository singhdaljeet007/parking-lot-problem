import { ParkingLot } from '../src/ParkingLot'

const carRegOne = 'KA-01-HH-1234';
const carRegTwo = 'KA-01-HH-9999';
const carRegThree = 'KA-01-BB-0001';
describe('when parking empty', () => {
    const parkingLot = new ParkingLot(2)
    test('getCarSlot', () => {
        expect(
            parkingLot.getCarSlotForRegistrationNumber('randomReg')
        ).toEqual(-1)
        expect(
            parkingLot.getCarSlotForRegistrationNumber(carRegOne)
        ).toEqual(-1)
    })
    test('park', () => {
        expect(parkingLot.park(carRegOne)).toBe(0)
        expect(parkingLot.park(carRegTwo)).toBe(1)
    })
    test('leave', () => {
        expect(parkingLot.leave(0)).toBe(true)
        expect(parkingLot.leave(1)).toBe(true)
        expect(parkingLot.leave(3)).toBe(false)
    })
})

describe('when parking full', () => {
    const parkingLot = new ParkingLot(2)
    parkingLot.park(carRegOne)
    parkingLot.park(carRegTwo)
    test('getCarSlot', () => {
        expect(parkingLot.getCarSlotForRegistrationNumber(carRegOne)).toBe(0)
        expect(parkingLot.getCarSlotForRegistrationNumber(carRegTwo)).toBe(1)
        expect(parkingLot.getCarSlotForRegistrationNumber(carRegThree)).toBe(-1)
    })
    test('park', () => {
        expect(parkingLot.park(carRegThree)).toBe(-1)
    })
    test('leave', () => {
        expect(parkingLot.leave(3)).toBe(false)
        expect(parkingLot.leave(1)).toBe(true)
    })
})