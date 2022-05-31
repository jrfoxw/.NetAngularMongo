/**
 * value: value of currency (1 dollar)
 * name: name of currency  (Ones)
 * total: total sum of currency (30 dollars)
 * amount: count of currency in bills (30 $1.00 bills)
 */
interface IDenomination {
    value: number,
    name: DenominationsEnum,
    total: number,
    amount: number,
    updateAmount: any,
    updateTotal: any
}

enum DenominationsEnum {
    ONES = 1,
    FIVES = 5,
    TENS = 10,
    TWENTIES = 20,
    FIFTIES = 50,
    HUNDREDS = 100,

}

class Denomination implements IDenomination{

    public value = 1;
    public name = DenominationsEnum.ONES;
    public amount = 10;
    public total = 10;


    /**
     * name: name of currency  (Ones)
     * value: value of currency (1 dollar)
     * total: total sum of currency (30 dollars)
     * amount: count of currency in bills (30 $1.00 bills)
     */
    constructor(name: DenominationsEnum, value: number, total:number, amount: number) {

        this.value = value;
        this.name = name;
        this.amount = amount;
        this.total = total;
    }

    public updateAmount(value: number){
        this.amount += value;
    }

    public updateTotal(value: number){
        this.total += value;

    }

    public static getEnumValue(value: IDenomination){
        var dEnum: DenominationsEnum = DenominationsEnum.ONES;
        switch(value.value){
            case 1:{
              dEnum = DenominationsEnum.ONES;
              break;
            }
            case 5:{
              dEnum = DenominationsEnum.FIVES;
              break;
            } 
            case 10:{
              dEnum = DenominationsEnum.TENS;
              break;
            } 
            case 20:{
              dEnum = DenominationsEnum.TWENTIES;
              break;
            } 
            case 50:{
              dEnum = DenominationsEnum.FIFTIES;
              break;
            } 
            case 100:{
              dEnum = DenominationsEnum.HUNDREDS;
              break;
            } 
            default: {
                //
                break;
            }
          }
          return dEnum;
    }
}


export { Denomination, IDenomination, DenominationsEnum };