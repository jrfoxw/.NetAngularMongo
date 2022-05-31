

interface IATM {
    id?: string,
    isOnline: boolean,
    maintenanceTime: string,
    maxCurrency: number,
    totalCurrency: number,
    totalDeposits: number,
    totalWithdraws: number,
    unitName: string

}

enum ATM_SYSTEM_MODES {
    OFFLINE = 0,
    ONLINE = 1,
    MAINTENANCE = 2,
}

enum ATM_TRANSACTION_MODES {
    ERROR = 0,
    WITHDRAW = 1,
    DEPOSIT = 2,
    VIEW_TRANSACTIONS = 3,
    VIEW_BALANCE = 4
}

class ATM implements IATM {
    public isOnline = false;
    public maintenanceTime = "";
    public maxCurrency = 0;
    public totalCurrency = 0;
    public totalDeposits = 0;
    public totalWithdraws = 0;
    public unitName = "";

    /**
     *
     */
    constructor() {

    }
}

export {ATM, IATM, ATM_SYSTEM_MODES, ATM_TRANSACTION_MODES}

