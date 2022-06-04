import React from 'react';

import { useTransactions } from '@Provider/useTransactions';
import Footer from '@components/Footer';
import Header from '@components/Header';

import Body from '../Body';

/**
 * @export
 * @component
 * @name Container
 * 
 * @description
 * Esse componente ficará responsável pela
 * montagem da tela de transações.
 */
export const Container = () => {
    const { typeCurrency, newConvert, handleChangeValue, updatedValue } = useTransactions();

    return (
        <>
            <Header typeCurrency={typeCurrency} arrTypeCurrency={newConvert}
                handleChangeValue={handleChangeValue} totalTransactions={updatedValue}
            />
            <Body />
            <Footer />
        </>
    );
};