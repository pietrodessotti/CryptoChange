import React, { useEffect, useState } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import styles from './styles.module.scss';
import { api } from '../../../services/api';

interface Coins {
    name?: string;
    symbol?: string;
    price?: number;
    websiteUrl?: string;
    id?: string;
    teste: string;
}

/**
 * @export
 * @component
 * @name Body
 * 
 * @description
 * Componente responsável por montar o body
 * da home page.
 */
export const Body = () => {
    const [cryptoCoins, setCryptoCoins] = useState<Coins[]>([]);
    const [typeComercialCoin, setTypeComercialCoin] = useState('USD')

    useEffect(() => {
        api.get(`coins?currency=${typeComercialCoin}`)
            .then(response => setCryptoCoins(response.data.coins))
    }, [])


    return (
        <div className={styles.test}>

        <table className={styles.tableContainer}>
            <thead className={styles.tableHeaderContainer}>
                <th>Nome</th>
                <th>Símbolo</th>
                <th>Preço</th>
                <th>Website Link</th>
                <th>Comprar Cripto</th>
            </thead>
            <tbody>
                {cryptoCoins.map(unityCoin => (
                    <tr  className={styles.tableBodyContainer} key={unityCoin.id}>
                        <td>{unityCoin.name}</td>
                        <td>{unityCoin.symbol}</td>
                        <td>R$ {unityCoin.price}</td>
                        <td><a href={unityCoin.websiteUrl} target='_blank' rel="noreferrer">{unityCoin.websiteUrl}</a></td>
                        <td></td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    )
}

// import React, { useEffect, useState } from 'react';

// import { AgGridColumn, AgGridReact } from 'ag-grid-react';

// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import './styles.module.scss';
// import { api } from '../../../services/api';

// interface Coins {
//     id: string;
//     name: string;
//     symbol: string;
//     price: number;
//     websiteUrl: string;
//     buyCoin: () => void;
// }

// /**
//  * @export
//  * @component
//  * @name Body
//  *
//  * @description
//  * Componente responsável por montar o body
//  * da home page.
//  */
// export const Body = () => {

//     const [cryptoCoins, setcryptoCoins] = useState<Coins[]>([]);

//     const [style, setStyle] = useState({
//         height: '100%',
//         width: '100%',
//         margin: 'auto',
//         marginTop: '50px',
//         boxShadow: '0 0 5px 1px black',
//     });

//     useEffect(() => {
//         api.get('coins?currency=BRL')
//             .then(response => setcryptoCoins(response.data.coins))
//     }, [])

//     const fillLarge = () => {
//         setWidthAndHeight('100%', '100%', 'auto', '50', '0 0 5px 1px black');
//     };

//     const fillMedium = () => {
//         setWidthAndHeight('60%', '60%', 'auto', '50', '0 0 5px 1px black');
//     };

//     const fillExact = () => {
//         setWidthAndHeight('400px', '400px', 'auto', '50', '0 0 5px 1px black');
//     };

//     const setWidthAndHeight = (width: string, height: string,
//         margin: string, marginTop: string, boxShadow: string) => {
//         setStyle({
//             width,
//             height,
//             margin,
//             marginTop,
//             boxShadow
//         });
//     };


//     return (
//         <>
//             <div style={{
//                 marginTop: '20px', marginBottom: '20px', display: 'flex', gap: 20,
//                 alignItems: 'center', justifyContent: 'center'
//             }}>
//                 <button onClick={() => fillLarge()}>Fill 100%</button>
//                 <button onClick={() => fillMedium()}>Fill 60%</button>
//                 <button onClick={() => fillExact()}>Exactly 400 x 400 pixels</button>
//             </div>
//             <div className="ag-theme-alpine" style={{
//                 height: 500,
//                 width: 1280, margin: 'auto',
//             }}>
//                 {/* {cryptoCoins.map((coins) => (
//                         <tr>
//                             <td >{coins.name}</td>
//                             <td >{coins.symbol}</td>
//                             <td >{coins.price}</td>
//                             <td >{coins.websiteUrl}</td>
//                         </tr>
//                     ))} */}
//                 <AgGridReact>
//                     {cryptoCoins.map((unityCoin) => (
//                         <>
//                             <AgGridColumn field={unityCoin.name}></AgGridColumn>
//                             <AgGridColumn field={unityCoin.symbol}></AgGridColumn>
//                             <AgGridColumn field={unityCoin.websiteUrl}></AgGridColumn>
//                         </>
//                     ))}
//                 </AgGridReact>
//             </div>
//         </>
//     )
// }