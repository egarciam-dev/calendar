import { addHours } from 'date-fns';
import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-modal'

// Estilo del modal
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

    // Store local para saber si modal esta abierto
    const [isOpen, setIsOpen] = useState(true);

    // useState para cargar los valores al form
    const [formValues, setFormValues] = useState({
        title: 'Engel',
        notes: 'Esta es una prueba de una nota',
        start: new Date(),
        end: addHours( new Date(), 2 ),
    })

    // Te permite cambiar los valores en el form
    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    // Funcion para actualizar la fecha al form desde el DatePicker
    const onDateChange = ( event, changing ) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    // Evento para cambiar el estado del modal a false
    const onCloseModal = () => {
        setIsOpen(false);
    }

    return (

        // Componente del modal
        <Modal
            isOpen={ isOpen }
            onRequestClose={ onCloseModal }
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }
        >
            {/* Cuerpo del modal */}
            <h1> Nuevo evento </h1>
                <hr />
                <form className="container">

                    <div className="form-group mb-2">
                        <label>Fecha y hora inicio</label>
                        <DatePicker 
                            selected={ formValues.start }
                            onChange={ (event) => onDateChange(event, 'start') }
                            className="form-control"
                            showTimeSelect
                            dateFormat="Pp"
                        />
                    </div>

                    <div className="form-group mb-2">
                        <label>Fecha y hora fin</label>
                        <DatePicker 
                            minDate={ formValues.start }
                            selected={ formValues.end }
                            onChange={ (event) => onDateChange(event, 'end') }
                            className="form-control"
                            showTimeSelect
                            dateFormat="Pp"
                        />
                    </div>

                    <hr />
                    <div className="form-group mb-2">
                        <label>Titulo y notas</label>
                        <input 
                            type="text" 
                            className="form-control"
                            placeholder="Título del evento"
                            name="title"
                            autoComplete="off"
                            value={ formValues.title }
                            onChange={ onInputChange }
                        />
                        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                    </div>

                    <div className="form-group mb-2">
                        <textarea 
                            type="text" 
                            className="form-control"
                            placeholder="Notas"
                            rows="5"
                            name="notes"
                            value={ formValues.notes }
                            onChange={ onInputChange }
                        ></textarea>
                        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>

                </form>

        </Modal>
    )
}
