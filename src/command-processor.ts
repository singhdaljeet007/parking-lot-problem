import { ParkingLot } from "./ParkingLot";

let parkingLot: ParkingLot;
export function commandProcessor(input: string): string {
    const params = input.split(' ')
    switch (params[0]) {
        case 'create_parking_lot':
            return createParkingLot(+params[1]);
        case 'park':
            return `park ${params[1]}`;
        case 'leave':
            return `leave ${params[1]} after ${params[2]} hrs`;
        case 'status':
            return 'Parking Lot status'
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