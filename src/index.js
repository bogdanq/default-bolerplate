// import { Test } from "@components/app"
import React from "react"
import ReactDOM from "react-dom"
// import styles from "./index.module.css"

import "./index.css"

const messages = ["Hello"]

const Messages = () => {
  return (
    <div>
      <h1>messages</h1>
      {messages.map((message) => (
        <p key={messages}>{message}</p>
      ))}
      <input placeholder="Введите сообщение" />
      <button>Отправить</button>
    </div>
  )
}

ReactDOM.render(
  <>
    <Messages title="title" />
  </>,
  document.querySelector("#root"),
)
