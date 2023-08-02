import React, { useRef, useState } from 'react'
import Togglable from './Togglable'

export default function PlayerForm ({ handleLogout, addPlayer }) {
  const [newPlayer, setNewPlayer] = useState('')
  const [newTeam, setNewTeam] = useState('')

  const elementRef = useRef()
  const toggableRef = useRef()

  const handlePlayerChange = (e) => {
    setNewPlayer(e.target.value)
  }

  const handleTeamChange = ({ target }) => {
    setNewTeam(target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const playerObject = {
      name: newPlayer,
      team: newTeam
    }

    addPlayer(playerObject)
    setNewPlayer('')
    setNewTeam('')
    toggableRef.current.toggleVisibility()
  }

  // para documentacion como acceder a la referencia de una etiqueta del dom
  console.log(elementRef)
  // es diferente a como funciona con un componente
  console.log(toggableRef)

  return (
    <Togglable
      ref={toggableRef}
      btnLabel='nuevo jugador'
      btnCancel='Ocultar formulario'
    >
      <h3 ref={elementRef}>Añade un nuevo jugador</h3>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={newPlayer}
          name='player'
          placeholder='escribe el nombre del jugador'
          onChange={handlePlayerChange}
        />
        <input
          type='text'
          value={newTeam}
          name='team'
          placeholder='escribe el equipo del jugador'
          onChange={handleTeamChange}
        />
        <button type='submit'>Save</button>
      </form>
      <div>
        <button onClick={handleLogout}>LogOut</button>
      </div>
    </Togglable>
  )
}
