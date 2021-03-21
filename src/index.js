import "./index.css"

import React from "react"
import ReactDOM from "react-dom"
import { Test } from "./app"
import styles from "./index.module.css"

const App = () => {
  return (
    <div className="app">
      <div className={styles.app}>App component</div>
      <Test />
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector("#root"))
