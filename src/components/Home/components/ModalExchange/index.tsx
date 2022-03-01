import React, { useState } from 'react';
import Modal from 'react-modal';

/**
 * @export
 * @component
 * @name ModalExchange
 * 
 * @description
 * Componente responsável pelo modal de compra.
*/
export const ModalExchange = (): JSX.Element => {
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
  * Função responsável por abrir o modal de
  * compra.
  */
  const handleCloseModal = () => {
    setModalIsOpen(false);
  }

  return (
    <div>
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
    </div>
  );
}

export default ModalExchange;