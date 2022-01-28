import Image from "next/image";

import { useState } from "react";

import React, { useContext } from 'react';
import { CartContext } from "../context/TransactionsContext";


import styles from './styles.module.scss';

export const Header = () => {
    if (true) {
        useState();
    }

    const data = useContext(CartContext);

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
            </div>
        </header>
    )
}