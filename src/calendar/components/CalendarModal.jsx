import { addHours, differenceInSeconds, isDate } from 'date-fns';
import React, { useMemo, useState } from 'react'
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-modal'
import es from 'date-fns/locale/es';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import { useUiStore } from '../../hooks';

// Register para el idioma ES
registerLocale('es', es)

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

    // Store con Redux para saber si el modal esta abierto
    const { isDateModalOpen } = useUiStore();

    // Store local para saber si modal esta abierto
    // const [isOpen, setIsOpen] = useState(true);

    // To check if submitted
    const [formSubmitted, setFormSubmitted] = useState(false);

    // useState para cargar los valores al form
    const [formValues, setFormValues] = useState({
        title: 'Engel',
        notes: 'Esta es una prueba de una nota',
        start: new Date(),
        end: addHours( new Date(), 2 ),
    });


    // UseMemo for memorizing the title and submission state
    const titleClass = useMemo(() => {
        
        // If not submitted
        if ( !formSubmitted ) return '';

        // If submitted and title length > 0
        return ( formValues.title.length > 0 )
            ? ''
            : 'is-invalid';

    }, [ formValues.title, formSubmitted ])

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
    // const onCloseModal = () => {
    //     setIsOpen(false);
    // }

    // Funcionar para manejar el posteo
    const onSubmit = ( event ) => {
        event.preventDefault();
        setFormSubmitted(true);

        const diff = differenceInSeconds( formValues.end, formValues.start );

        if( isNaN( diff ) || diff <= 0 ) {
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error')
        }

        if( formValues.title.length <= 0 ) return;
        
    }

    return (

        // Componente del modal
        <Modal
            isOpen={ isDateModalOpen }
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }
        >
            {/* Cuerpo del modal */}
            <h1> Nuevo evento </h1>
                <hr />
                <form className="container" onSubmit={ onSubmit }>

                    <div className="form-group mb-2">
                        <label>Fecha y hora inicio</label>
                        <DatePicker 
                            selected={ formValues.start }
                            onChange={ (event) => onDateChange(event, 'start') }
                            className="form-control"
                            showTimeSelect
                            dateFormat="Pp"
                            locale="es"
                            timeCaption="Hora"
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
                            locale="es"
                            timeCaption="Hora"
                        />
                    </div>

                    <hr />
                    <div className="form-group mb-2">
                        <label>Titulo y notas</label>
                        <input 
                            type="text" 
                            className={ `form-control  ${ titleClass }` }
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
