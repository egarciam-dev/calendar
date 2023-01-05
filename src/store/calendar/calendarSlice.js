import { createSlice } from "@reduxjs/toolkit";
import { addHours } from 'date-fns/esm'

const tempEvent = {
    title: 'Cumpleanos de Amorcito',
    notes: 'Comprar un regalo para ella',
    start: new Date(),
    end: addHours( new Date(), 2 ),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Engel Garcia'
    }
};

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [ tempEvent ],
        activeEvent: null
    },
    reducers: {
        
    }
});

// Actions 
export const {  } = calendarSlice.actions;