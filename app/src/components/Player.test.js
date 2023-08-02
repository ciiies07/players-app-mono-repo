import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Player from './Player'

test('renders player', () => {
  const player = {
    name: 'LeBron James',
    team: 'Lakers'
  }

  // const utils = render(<Player player={player} />)
  render(<Player player={player} />)

  // console.log(component);

  // component.getByText('Jugador: LeBron James')
  // utils.getByText('Equipo: Lakers')
  screen.getByText('Equipo: Lakers')
  screen.getByText('Jugador: LeBron James')

  // (utils.container).toHaveTextContent(player.name);
  // expect(view.container).toHaveTextContent(player.team);

  // const li = utils.container.querySelector('li')
  // const li = screen.getAllByRole('listitem')
  // console.log(li);
})
