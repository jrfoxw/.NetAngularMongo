export interface ITransaction{
    id?: number;
    transactionGroupId?: number;
    dateOfEntry?: string;
    user?: string;
    transaction?: string;
}


export class Transaction implements ITransaction{
    public transactionGroupId?: number  = 0;
    public user?: string = "";
    public transaction?: string = "";
    public dateOfEntry?: string | undefined; 

    constructor(user: string, transaction: string){
        this.user = user;
        this.transaction = transaction;

        var date = new Date();
        var group = `${date.getDate()}${date.getMonth()}${date.getFullYear()}`;
        this.dateOfEntry = Date.now().toString();
        this.transactionGroupId = parseInt(group);
    }
}

