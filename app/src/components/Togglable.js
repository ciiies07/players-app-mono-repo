import React, { useState, useImperativeHandle, forwardRef } from 'react' // forwardref para añadir referencia a modulos React
// el imperativeHandle es para declarar funciones en un modulo de tal forma que pueda ser utilizada fuera del componente
import PropTypes from 'prop-types'

const Togglable = forwardRef(({ children, btnLabel = 'Mostrar', btnCancel = 'Ocultar' }, ref) => {
  const [visible, setVisible] = useState(false)

  const hidenWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hidenWhenVisible}>
        <button
          onClick={() => {
            setVisible(true)
          }}
        >
          {btnLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button
          onClick={() => {
            setVisible(false)
          }}
        >
          {btnCancel}
        </button>
      </div>
    </div>
  )
})
Togglable.displayName = 'Toggable'
Togglable.propTypes = {
  btnLabel: PropTypes.string,
  btnCancel: PropTypes.string
}

export default Togglable
