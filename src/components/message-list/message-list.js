import React, { Component } from "react"

import { Message } from "../message"

export class MessageList extends Component {
  state = {
    messages: [{ author: "User", value: "Тест сообщение" }],
  }

  sendMessage = () => {
    const { messages } = this.state

    this.setState({
      messages: [...messages, { author: "User", value: "Нормально" }],
    })
  }

  componentDidUpdate() {
    // TODO - реализовать ответ бота, не забыть условие !
  }

  render() {
    const { messages } = this.state

    return (
      <div>
        <button onClick={this.sendMessage}>Отправить сообщение</button>

        {messages.map((message, index) => (
          <Message message={message} key={index} />
        ))}
      </div>
    )
  }
}
