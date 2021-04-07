import { Input, withStyles, InputAdornment } from "@material-ui/core"
import { Send } from "@material-ui/icons"
import React, { Component, createRef } from "react"

import { Message } from "./message"
import styles from "./message-list.module.css"

const StyledInput = withStyles(() => {
  return {
    root: {
      "&": {
        color: "#9a9fa1",
        padding: "10px 15px",
        fontSize: "15px",
      },
    },
  }
})(Input)

export class MessageList extends Component {
  ref = createRef()

  handlePressInput = ({ code }) => {
    if (code === "Enter") {
      this.handleSendMessage()
    }
  }

  handleSendMessage = () => {
    const { sendMessage, value } = this.props

    sendMessage({ author: "User", message: value })
  }

  handleScrollBottom = () => {
    if (this.ref.current) {
      this.ref.current.scrollTo(0, this.ref.current.scrollHeight)
    }
  }

  componentDidUpdate() {
    this.handleScrollBottom()
  }

  render() {
    const { value, messages } = this.props

    return (
      <>
        <div ref={this.ref}>
          {messages.map((message, index) => (
            <Message message={message} key={index} />
          ))}
        </div>

        <StyledInput
          fullWidth={true}
          value={value}
          onChange={(e) => this.props.handleChangeValue(e.target.value)}
          onKeyPress={this.handlePressInput}
          placeholder="Введите сообщение..."
          endAdornment={
            <InputAdornment position="end">
              {value && (
                <Send
                  className={styles.icon}
                  onClick={this.handleSendMessage}
                />
              )}
            </InputAdornment>
          }
        />
      </>
    )
  }
}
