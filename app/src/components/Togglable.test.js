import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import Togglable from './Togglable'

describe('<Toggable />', () => {
  // let component
  const btnL = 'show'
  const btnC = 'cancel'
  const setup = () => {
    render(
      <Togglable btnLabel={btnL} btnCancel={btnC}>
        <div>Hi Test</div>
      </Togglable>
    )
  }

  beforeEach(() => {
    setup()
  })

  test('renders its children', () => {
    screen.getByText('Hi Test')
  })

  test('is visible?', () => {
    const el = screen.getByText('Hi Test')
    console.log(screen)
    expect(el.parentNode).toHaveStyle('display: none')
  })

  test('afeter clicking its children must be shown', () => {
    const btn = screen.getByText(btnL)
    fireEvent.click(btn)

    const el = screen.getByText('Hi Test')
    expect(el.parentNode).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', () => {
    const btnc = screen.getByText(btnC)
    fireEvent.click(btnc)

    const el = screen.getByText('Hi Test')
    expect(el.parentNode).toHaveStyle('display: none')
  })
})
