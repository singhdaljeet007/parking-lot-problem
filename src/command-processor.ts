import { ParkingLot } from './ParkingLot'
import { Slot } from './interfaces/Slot'
let parkingLot: ParkingLot;

export function commandProcessor(input: string): string {
    const params = input.split(' ')
    switch (params[0]) {
        case 'create_parking_lot':
            return createParkingLot(+params[1],+params[2]);
        case 'park':
            return park(params[1]);
        case 'leave':
            return leave(params[1], +params[2]);
        case 'status':
            return getParkingLotStatus();
        default:
            return 'Invalid input';
    }
}
/**
 * 
 * @param slots 
 * @
 */
function createParkingLot(slots: number,floors?:number): string {
    if(!slots || slots<1){
        return 'Invalid slots';
    }
    floors = !floors ? 1 :floors;
    parkingLot = new ParkingLot(slots,floors);
    return `Created parking lot with ${floors} floors having ${slots} slots each`;
}

function park(registrationNo: string): string {
    if (!parkingLot) {
        return 'No Parking Lot Created';
    }
    if(!registrationNo || registrationNo==''){
        return 'No Registration no provided';
    }
    const slot:Slot = parkingLot.park(registrationNo);
    if (slot.slotNo === -1 && slot.floor === -1) {
        return 'Sorry, parking lot is full';
    }
    return `Allocated slot number: ${slot.slotNo + 1} on floor ${slot.floor + 1}`;
}

function leave(registrationNo: string, hours: number): string {
    if (!parkingLot) {
        return 'No Parking Lot Created'
    }
    let slot = parkingLot.getCarSlotForRegistrationNumber(registrationNo);
    if (slot.slotNo === -1 && slot.floor === -1) {
        return `Registration number ${registrationNo} not found`;
    }
    let leave = parkingLot.leave(slot);
    let parkingCharges = (hours > 2) ? 10 + ((hours - 2) * 10) : 10;
    return `Registration number ${registrationNo} with Slot Number ${slot.slotNo+1} on floor ${slot.floor +1} is free with Charge ${parkingCharges}`
}

function getParkingLotStatus() {
    if (!parkingLot) {
        return 'No Parking Lot Created'
    }
    let status = parkingLot.getParkingLotStatus().trim();
    return status;
}