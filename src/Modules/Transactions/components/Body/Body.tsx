import React from 'react';
import { useTransactions } from '@Provider/useTransactions';

/**
 * @export
 * @component
 * @name Body
 * 
 * @description
 * Component responsible for mounting the body of
 * transactions page.
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