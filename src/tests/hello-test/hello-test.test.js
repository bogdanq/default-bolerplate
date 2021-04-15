import { render } from "@testing-library/react"
import React from "react"

import { HelloTest } from "./index"

describe("HelloTest component", () => {
  it('should render without "name" props', () => {
    const { getByText } = render(<HelloTest />)

    expect(getByText("Hey")).toBeDefined()
  })

  it('should render with "name" props', () => {
    const { getByText } = render(<HelloTest name="Test" />)

    expect(getByText("Hello, Test")).toBeDefined()
  })

  it("snapshot", () => {
    const { container } = render(<HelloTest name="Test" />)

    expect(container.firstChild).toMatchSnapshot()
  })
})
