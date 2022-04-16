import React from 'react';

import Footer from '../../../../components/Footer';
import Body from '../Body';
import Header from '../Header';

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
    return (
        <>
            <Header />
            <Body />
            <Footer />
        </>
    );
};