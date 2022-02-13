import React, { useContext, useEffect, useState } from 'react';
import Image from "next/image";

import { CartContext } from "../../context/TransactionsContext";

import styles from './styles.module.scss';
import { comercialCoin } from '../../../services/api';

type ComercialCoins= {
    base_code: string;
    conversion_rates: {
        key: string;
        value: string;
    }
}

/**
 * @export
 * @component
 * @name Header
 * 
 * @description
 * Componente responsável por montar o Header da aplicação.
 */
export const Header = () => {

    const data = useContext(CartContext);

    const [convertComercialCoin, setConvertComercialCoin] = useState<ComercialCoins[]>([]);

    useEffect(() => {
        comercialCoin.get(`https://v6.exchangerate-api.com/v6/c87de6b059e6791749e979f7/latest/BRL`)
            .then(response => setConvertComercialCoin(response.data.conversion_rates))
    }, [])

    // console.log(convertComercialCoin)

    for(let converting of convertComercialCoin) {
        console.log(converting)
    }


    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                {/* Maneira antiga de consumir um contexto
                <CartContext.Consumer> 
                {(data) => {
                console.log(data)
                return <p>Testando data da forma antiga </p>
                }}
            </ CartContext.Consumer>
             */}
                <Image src='/images/logotipo-ethereum.png' alt="Logotipo do CryptoChange"
                    width={40} height={40} />
                <a href="">CryptoChange</a>
                <nav>
                    <a href="">Home</a>
                    <a href="">Exchenge</a>
                </nav>

                <select name="select">
                    {/* {convertComercialCoin.map(comercialCoin => ( */}
                        <>
                    <option value="" hidden></option>
                    <option value="valor2" selected>{comercialCoin}</option>
                        </>
                    {/* ))}  */}
                    {/* <option value="valor3">Valor 3</option> */}
                    <>
                        {/* <option value={convertComercialCoin}>{convertComercialCoin}</option> */}
                    </>
                </select>
            </div>
        </header>
    )
}