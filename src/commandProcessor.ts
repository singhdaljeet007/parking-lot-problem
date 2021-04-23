export function commandProcessor(input: string): string {
    const params = input.split(' ')
    switch (params[0]) {
        case 'create_parking_lot':
            return 'Parking Lot created';
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