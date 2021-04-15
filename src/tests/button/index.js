import React from "react"

export const Button = ({ disabled = false, title = "", onClick }) => {
  return (
    <button
      data-testid="btn"
      className="btn"
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </button>
  )
}
