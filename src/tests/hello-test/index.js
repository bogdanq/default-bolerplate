import React from "react"

export const HelloTest = ({ name }) => {
  if (name) {
    return <h1 data-testid="h1">Hello, {name}</h1>
  }

  return <span data-testid="span">Hey</span>
}
