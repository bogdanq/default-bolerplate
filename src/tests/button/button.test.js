import { render, fireEvent } from "@testing-library/react"
import React from "react"
import { Button } from "./index"

describe("Button component", () => {
  it("button handlers", () => {
    const mockCallback = jest.fn()

    const { container, getByTestId } = render(<Button onClick={mockCallback} />)

    fireEvent.click(getByTestId("btn"))
    // fireEvent.click(container.querySelector(".btn"))

    expect(mockCallback.mock.calls.length).toBe(1)
  })
})
