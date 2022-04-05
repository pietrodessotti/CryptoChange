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
    name: string;
    price: number;
}

export type TransactionsContextData = {
    typeCurrency: string;
    handleChangeValue: (e: any) => void;
    handleSearch: (event: { target: { value: React.SetStateAction<string> } }) => void;
    dataItems: Array<PropCoin>;
    fiduciary: FiduciaryConvert;
    newConvert: Array<FiduciaryConvert>;
    handleCloseModal: () => void;
    handleSetCoinForSelect: (coin: any) => void;
    modalIsOpen: boolean;
    coinSelected: any;
    values: any;
    handleCreateNewTransaction: (values: any) => void;
}