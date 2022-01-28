import Image from "next/image"
import { useEffect } from "react"
import { api } from "../../services/api"

export const Home = ():JSX.Element => {

    
    return (
    <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
            <Image src='/images/logotipo-ethereum.png' alt="Logotipo do CryptoChange" 
             width={40} height={40}/>
             <a href="">CryptoChange</a>
            <nav>
                <a href="">Home</a>
                <a href="">Exchenge</a>
            </nav>
        </div>        
    </header>
    )
}

