
import { Slot } from './interfaces/Slot';

export class ParkingLot 
{
    private totalSlots: number;
    private slots:Array<Array<string>> = [];
    private totalFloors:number=1;
    private nextAvailableSlot: Slot = {floor:-1,slotNo:-1};

    constructor(slots: number,floors:number) {
        this.totalFloors=floors;
        this.totalSlots = slots;
        for(let i=0;i<this.totalFloors;i++){
            this.slots[i]=[];
            for (let j = 0; j < this.totalSlots; j++) {
                this.slots[i][j]='EMPTY';
            }
        }
    }

    private getNextAvailableSlot(): Slot{
        for(let i=0;i<this.totalFloors;i++){
            for (let j = 0; j < this.totalSlots; j++) {
                if (this.slots[i][j]=='EMPTY') {
                    return {floor:i,slotNo:j};
                }
            }
        }
        return {floor:-1,slotNo:-1}
    }

    public park(registrationNo: string): Slot {
        this.nextAvailableSlot = this.getNextAvailableSlot();
        if(this.nextAvailableSlot.slotNo===-1 && this.nextAvailableSlot.floor===-1){
            return this.nextAvailableSlot;
        }
        this.slots[this.nextAvailableSlot['floor']][this.nextAvailableSlot['slotNo']] = registrationNo;
        return this.nextAvailableSlot;
    }

    public leave(slot: Slot): boolean {
        if (slot.slotNo ==-1 || this.slots[slot.floor][slot.slotNo]=='EMPTY') {
            return false;
        }
        this.nextAvailableSlot = (this.nextAvailableSlot.floor == -1 && this.nextAvailableSlot.slotNo == -1) || (slot.floor <= this.nextAvailableSlot.floor && slot.slotNo<this.nextAvailableSlot.slotNo) ? slot : this.nextAvailableSlot;
        this.slots[this.nextAvailableSlot.floor][this.nextAvailableSlot.slotNo]='EMPTY';
        return true;
    }

    public getParkingLotStatus() {
        if(this.slots.length==0){
            return 'No cars parked';
        }
        let status:string = "Floor\tSlot No.\tRegistration No.\n";
        for(let i=0;i<this.totalFloors;i++){
            for(let j=0;j<this.totalSlots;j++){
                status+= i+1 +"\t"+(j+1)+"\t\t"+this.slots[i][j]+"\n";
            }
        }
        return status;
    }

    public getCarSlotForRegistrationNumber(regNo: string): Slot {
        let floor = this.slots.findIndex(floor => floor.includes(regNo));
        if(floor==-1){
            return {floor:-1,slotNo:-1}
        }
        let slotNo = this.slots[floor].indexOf(regNo);
        return {floor:floor,slotNo:slotNo}
    }
}