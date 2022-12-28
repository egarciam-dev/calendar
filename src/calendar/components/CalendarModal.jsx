import React, { useState } from 'react'
import Modal from 'react-modal'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export const CalendarModal = () => {

    const [isOpen, setIsOpen] = useState(true);

    const onCloseModal = () => {
        setIsOpen(false);
    }

    return (
        <Modal
            isOpen={ isOpen }
            onRequestClose={ onCloseModal }
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }
        >
            <h1>Hola Mundo</h1>
            <hr/>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla numquam quaerat eaque eum natus autem id ab amet assumenda blanditiis, pariatur odio itaque ex enim fugit voluptatem quas dolorum consequuntur?</p>

        </Modal>
    )
}
