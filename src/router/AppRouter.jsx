import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth/pages';
import { CalendarPage } from '../calendar/calendarPage';

export const AppRouter = () => {
    
    const authStatus = false;
  
    return (
    <Routes>
        {
            ( !authStatus )
            ? <Route path="/auth/login" element={ <LoginPage /> } />
            : <Route path="/*" element={ <CalendarPage /> } /> 
        }

        {/* If path not found navitage to login */}
        <Route path='/*' element={ <Navigate to="/auth/login"/> } />

    </Routes>
  )
}
