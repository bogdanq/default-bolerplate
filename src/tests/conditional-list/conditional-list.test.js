import { render } from "@testing-library/react"
import React from "react"
import { ConditionalList } from "./index"

describe("conditional-list component", () => {
  it("should render ConditionalList with default props", () => {
    const { getByText } = render(<ConditionalList />)

    expect(getByText("Данных нет")).toHaveTextContent("Данных нет")
  })
  it("should render ConditionalList with error", () => {
    const error = "При получении данных произошла ошибка"
    const { getByText } = render(<ConditionalList error={true} data={[]} />)

    expect(getByText(error)).toHaveTextContent(error)
  })
})
