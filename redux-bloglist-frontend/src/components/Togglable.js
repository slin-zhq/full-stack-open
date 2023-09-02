import PropTypes from 'prop-types'
import { forwardRef, useImperativeHandle, useState } from 'react'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div
        style={hideWhenVisible}>
        <button
          className="btn-outline"
          onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div
        className='p-4 border border-gray-300 rounded-lg'
        style={showWhenVisible}>
        {props.children}
        <button
          className="btn-outline my-1"
          onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable