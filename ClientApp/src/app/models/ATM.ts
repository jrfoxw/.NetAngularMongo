

interface IATM {
    systemMode: ATM_SYSTEM_MODES,
    transactionMode: ATM_TRANSACTION_MODES,
    isOnline: boolean  
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


export {IATM, ATM_SYSTEM_MODES, ATM_TRANSACTION_MODES}

