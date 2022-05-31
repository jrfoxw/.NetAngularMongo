
import { MessageService } from "../services/message.service";

export default class User {
    name: string = "Bob";
    totalAmountInBank = 20;
    totalAmountString = "$20.00";

    /**
     *
     */
    constructor(name: string = "", amount: number = 0, private messageService?: MessageService) {
        this.name = name;
        this.totalAmountInBank = amount;
        this.setStringValue();
       

    }

    setStringValue(){
        this.totalAmountString = `$${this.totalAmountInBank}.00`;
    }

    AddToUsersTotal(amount: number){
        this.totalAmountInBank += amount;
        this.setStringValue();
    }

    SubtractFromUsersTotal(amount: number): boolean{
        if(this.totalAmountInBank > amount){
            this.totalAmountInBank += -amount;
            this.setStringValue();
            return true;
        }else{
            this.messageService?.addMessage("ATM_SYSTEM", "YOU ARE BROKE");
            return false;
        }
    }
}