import { Input, withStyles, InputAdornment } from "@material-ui/core"
import { Send } from "@material-ui/icons"
import React, { Component, createRef } from "react"
import { connect } from "react-redux"
import { sendMessage } from "../../store"
import { Message } from "./message"
import styles from "./message-list.module.css"
import { MessagesNotFound } from "./messages-not-found"

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

export class MessageListView extends Component {
  ref = createRef()

  handlePressInput = ({ code }) => {
    if (code === "Enter") {
      this.handleSendMessage()
    }
  }

  handleSendMessage = () => {
    const { sendMessage, value, match } = this.props
    const { id } = match.params

    sendMessage({ author: "User", message: value, roomId: id })
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
          {!messages.length ? (
            <MessagesNotFound />
          ) : (
            messages.map((message, index) => (
              <Message message={message} key={index} />
            ))
          )}
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

const mapStateToProps = (state, props) => {
  const { id } = props.match.params

  return {
    messages: state.messagesReducer[id] || [],
    // @TODO проверить селектор value
  }
}

const mapDispachToProps = (dispatch) => ({
  sendMessage: (params) => dispatch(sendMessage(params)),
  // @TODO добавить changeValue action
})

export const MessageList = connect(
  mapStateToProps,
  mapDispachToProps,
)(MessageListView)
