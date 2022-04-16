export type PropCoin = {
    id: string;
    name: string;
    price: number;
    priceChange1d: number;
    priceChange1h: number;
    priceChange1w: number;
    symbol: string;
    icon: string;
    websiteUrl: string;
};

export type ComercialCoins = {
    base_code: string;
    conversion_rates: {
        key: string;
        value: string;
    };
    typeCurrency: string;
};

export type convertFinally = {
    convertAll: string[]
}

export type FiduciaryConvert = {
    name: number;
    price: number | any;
}

export type ValuesType = {
    id: string,
    name: string,
    quantity: number,
    total: number,
    fiduciary: string,
};

export type TransactionsContextData = {
    typeCurrency: string;
    handleChangeValue: (e: any) => void;
    handleSearch: (event: { target: { value: React.SetStateAction<string> } }) => void;
    dataItems: Array<PropCoin>;
    fiduciary: Array<FiduciaryConvert>;
    newConvert: Array<FiduciaryConvert>;
    handleCloseModal: () => void;
    handleSetCoinForSelect: (coin: any) => void;
    modalIsOpen: boolean;
    coinSelected: any;
    values: ValuesType[];
    handleCreateNewTransaction: (values: any) => void;
    messageSuccess: string;
    loading: boolean;
    handleCancelExchange: () => void;
}