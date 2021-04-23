export class ParkingLot{
    private totalSlots:number;
    private slots:Array<string> = [];

    constructor(slots:number){
        this.totalSlots=slots;
    }

    private getSlot(){
        for (let i = 0; i < this.totalSlots; i++) {
            if (!this.slots[i]) {
                return i;
            }
        }
        return -1;
    }

    public park(registrationNo: string): number {
        let assignedSlot = this.getSlot();
        this.slots[assignedSlot] = registrationNo;
        return assignedSlot;
    }

    public leave(slot: number): boolean {
        if (slot > this.totalSlots || !this.slots[slot]) {
            return false;
        }
        return delete this.slots[slot];
    }

    public getCarSlotForRegistrationNumber(regNo: string): number | -1 {
        return this.slots.findIndex(elem=>elem==regNo);
    }
}