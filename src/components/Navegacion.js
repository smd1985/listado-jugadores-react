import React from 'react'
import { Link } from 'react-router-dom'

export default function Navegacion() {
    return (
        <header>

            <h1>Listado jugadores</h1>
            <Link to="/">Home</Link> - 
            <Link to="/jugadores" id="players">Jugadores</Link> - 
            <Link to="/addJugador">Añadir jugador</Link>
            
        </header>
    )
}