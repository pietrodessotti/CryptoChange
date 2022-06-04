import React from 'react';
import Chart from 'react-google-charts';

import styles from './styles.module.scss';
import options from '../../configuration';
import { useModalExchange } from '../../useModalExchange';

/** 
 * @export 
 * @comonent
 * @name Graph
 * 
 * @description
 * Component responsible for rendering the graph.
 */
export const Graph = (): JSX.Element => {
    const { data, valueCoin, newTextData, active, setActive } = useModalExchange();
    return (
        <>
            {valueCoin > 0 ? (
                <p style={{ marginBottom: 10 }}>
                    {newTextData} alta de {valueCoin}%
                </p>
            ) : (
                <div style={{ marginBottom: 10, color: 'red' }}>
                    {newTextData} baixa de {valueCoin}%
                </div>
            )}

            {!active ? (
                <p onClick={() => setActive(!active)} className={styles.seeGraph}>
                    Ver gráfico
                </p>
            ) : (
                <>
                    <p onClick={() => setActive(!active)} className={styles.seeGraph}>
                        Esconder gráfico
                    </p>
                    <Chart
                        chartType="AreaChart"
                        width="100%"
                        height="400px"
                        data={data}
                        options={options}
                    />
                </>
            )}
        </>
    );
}