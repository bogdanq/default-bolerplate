import "@testing-library/jest-dom/extend-expect"

console.error = (error) => {
  throw new Error("Какая то ошибка", error)
}
