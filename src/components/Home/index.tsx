import { Header } from "./Header"
import { Body } from "./Body"


/**
 * @export 
 * @component
 * @name Home
 * 
 * @description
 * Componente responsável por renderizar toda a
 * página de home.
 */
export const Home = (): JSX.Element => {


    return (
        <>
            <Header />

            <Body />

            <footer style={{ marginTop: 50, border: '2px solid red' }}>
                teste
            </footer>

        </>
    )
}

