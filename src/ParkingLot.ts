export class ParkingLot 
{
    private totalSlots: number;
    private slots:Array<string> = [];
    private nextAvailableSlot: number = 0

    constructor(totalSlots: number) {
        this.totalSlots = totalSlots;
    }

    private getNextAvailableSlot(currentSlot: number): number {
        for (let i = currentSlot; i < this.totalSlots; i++) {
            if (!this.slots[i]) {
                return i;
            }
        }
        return -1;
    }

    public park(registrationNo: string): number {
        if(this.nextAvailableSlot==-1){
            return -1;
        }
        let assignedSlot = this.nextAvailableSlot;
        this.slots[assignedSlot] = registrationNo;
        this.nextAvailableSlot = this.getNextAvailableSlot(assignedSlot)
        return assignedSlot;
    }

    public leave(slot: number): boolean {
        if (slot > this.totalSlots || !this.slots[slot]) {
            return false;
        }
        this.nextAvailableSlot = this.nextAvailableSlot == -1 || slot < this.nextAvailableSlot ? slot : this.nextAvailableSlot;
        return delete this.slots[slot];
    }

    public getParkingLotStatus() {
        if(this.slots.length==0){
            return 'No cars parked';
        }
        let status:string = "Slot No.\tRegistration No.\n";
        this.slots.forEach((registrationNo,index)=>{
            status+= index+1 +"\t"+registrationNo;
            if(index<this.slots.length-2){
                status+="\n";
            }
        })
        return status;
    }

    public getCarSlotForRegistrationNumber(regNo: string): number | -1 {
        return this.slots.findIndex(elem=>elem==regNo);
    }
}