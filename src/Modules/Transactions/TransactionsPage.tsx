import React from 'react';

import { TransactionsProvider } from '../Provider';
import Container from './components/Container';

type Coin = {
    id: string;
    name: string;
    price: number;
    priceChange1d: number;
    priceChange1h: number;
    priceChange1w: number;
    symbol: string;
    icon: string;
    websiteUrl: string;
}

export type FiduciaryConvert = {
    name: string | any;
    price: number | any;
}

type Props = {
    coin: Array<Coin>;
    fiduciary: Array<FiduciaryConvert>;
}

/**
 * @export
 * @component
 * @name TransactionsPage
 * 
 * @description
 * Esse componente irá carregar os dados de todas
 * as transações realizadas na HomePage.
 */
export const TransactionsPage = (): JSX.Element => {
    return (
        <Container />
    );
};