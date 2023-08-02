import React from 'react'

const Player = ({ player }) => {
  // console.log("p"); console.log(player);
  return (
    <li className='player'>
      <div>{`Jugador: ${player.name} `}</div>
      <div>{`Equipo: ${player.team}`}</div>
    </li>
  )
}

export default Player
