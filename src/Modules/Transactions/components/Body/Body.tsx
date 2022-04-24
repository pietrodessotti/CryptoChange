import React from 'react';
import { useTransactions } from '../../../Provider/useTransactions';

/**
 * @export
 * @component
 * @name Body
 * 
 * @description
 * Componente responsável por montar o Body da
 * tela de transações.
 */
export const Body = () => {
    const { values } = useTransactions();

    return (
        <>
            {/* {values?.map((item) => (
                <>
                    <p>{item.name}</p>
                    <p>{item.total}</p>
                </>
            ))} */}
        </>
    )

}