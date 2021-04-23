import { ParkingLot } from "./ParkingLot";

let parkingLot: ParkingLot;
export function commandProcessor(input: string): string {
    const params = input.split(' ')
    switch (params[0]) {
        case 'create_parking_lot':
            return createParkingLot(+params[1]);
        case 'park':
            return park(params[1]);
        case 'leave':
            return leave(params[1], +params[2]);
        case 'status':
            return getParkingLotStatus();
        default:
            return 'Invalid input'
    }
}

function createParkingLot(slots:number):string{
    if(!slots || slots<1){
        return 'Invalid slots';
    }
    parkingLot = new ParkingLot(slots);
    return `Created parking lot with ${slots} ${slots === 1 ? 'slot' : 'slots'}`;
}


function park(registrationNo: string): string {
    const slot = parkingLot.park(registrationNo);
    if (slot === -1) {
        return 'Sorry, parking lot is full';
    }
    return `Allocated slot number: ${slot + 1}`;
}

function leave(registrationNo: string, hours: number): string {
    let slot = parkingLot.getCarSlotForRegistrationNumber(registrationNo);
    let leave = parkingLot.leave(slot);
    let parkingCharges = (hours > 2) ? 10 + ((hours - 2) * 10) : 10;
    return `Registration number ${registrationNo} with Slot Number ${slot+1} is free with Charge ${parkingCharges}`;
}

function getParkingLotStatus() {
    let status = parkingLot.getParkingLotStatus();
    return status;
}