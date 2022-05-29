interface IDenomination {
    value: number,
    name: DenominationsEnum,
    amount: number
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

    public value = 0;
    public name = DenominationsEnum.ONES;
    public amount = 10;

    /**
     *
     */
    constructor(name: DenominationsEnum, value: number) {

        this.value = value;
        this.name = name;
    }
}


export { Denomination, IDenomination, DenominationsEnum };