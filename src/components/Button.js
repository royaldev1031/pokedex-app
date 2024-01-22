import React from 'react'

function Button({ children, onClick, type }) {
  return (
    <button
      onClick={onClick}
      className={`${
        type === 'primary' ? 'btn-primary' : 'btn-success'
      } uppercase`}
    >
      {children}
    </button>
  )
}

export default Button
