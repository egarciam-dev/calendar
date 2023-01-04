import React, { useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours } from 'date-fns/esm'

import { Navbar } from './components/Navbar'
import { localizer, getMessagesES } from '../helpers'
import { CalendarEvent } from './components/CalendarEvent'
import { CalendarModal } from './components/CalendarModal'
import { useUiStore } from '../hooks'

const events = [{
  title: 'Cumpleanos de Elianny',
  notes: 'Comprar un regalo para ella',
  start: new Date(),
  end: addHours( new Date(), 2 ),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Engel Garcia'
  }
}]

export const CalendarPage = () => {

  // Custom Hook
  const { openDateModal } = useUiStore();

  // Use state
  const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'week' );

  // Evento para estilizar una cita en el calendario
  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  // start-  Eventos de acciones para el calendario
  const onDoubleClick = ( event ) => {
    openDateModal();
  }

  const onSelect = ( event ) => {
    console.log( { click: event })
  }

  const onViewChanged = ( event ) => {
    localStorage.setItem('lastView', event);
    setLastView( event );
  }
  // end - Eventos de acciones para el calendario

  return ( 
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px)' }}
        messages={ getMessagesES() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />


      <CalendarModal />

    </>
  )
}
