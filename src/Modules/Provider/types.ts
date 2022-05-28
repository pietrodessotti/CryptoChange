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

export type FiduciaryCoin = {
    name: string;
    price: number | any;
}

export type ConvertReturnAPI = {
    name: string;
    quantity: number;
    price?: number | any;
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
    fiduciary: Array<FiduciaryCoin>;
    newConvert: Array<FiduciaryCoin>;
    handleCloseModal: () => void;
    handleSetCoinForSelect: (coin: any) => void;
    modalIsOpen: boolean;
    coinSelected: any;
    values: ValuesType[];
    handleCreateNewTransaction: (values: any) => void;
    messageSuccess: string;
    loading: boolean;
    valueInputQuantity: number;
    setValueInputQuantity: React.Dispatch<React.SetStateAction<number>>;
    updatedValue: number;

    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    handleConvertTransactions: ConvertReturnAPI[];
}