import React, { useState } from "react";
import Modal from 'react-modal';

import { Body } from "../Body";
import Footer from "../Footer";
import { Header } from "../Header";

/** 
 * @export
 * @component
 * @name Container
 * 
 * @description
 * Esse componente irá carregar os dados de Header e Body
 * 
 */
export const Container = (): JSX.Element => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    /**
      * @function
      * @name handleOpenModal
      * 
      * @description
      * Função responsável por abrir o modal de
      * compra.
      */
    const handleOpenModal = () => {
        setModalIsOpen(true);
    }

    /**
    * @function
    * @name handleOpenModal
    * 
    * @description
    * Função responsável por fechar o modal de
    * compra.
    */
    const handleCloseModal = () => {
        setModalIsOpen(false);
    }

    return (
        <>
            <Header />
            <Body onOpenNewTransactionModal={handleOpenModal} />

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Example Modal"
            >
                <button onClick={handleCloseModal}>close</button>
                <div>I am a modal</div>
                <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                </form>
            </Modal>

            <Footer />
        </>
    );
};

export default Container;