import { Input, withStyles, InputAdornment } from "@material-ui/core"
import { Send } from "@material-ui/icons"
import React, { Component, createRef } from "react"
import { connect } from "react-redux"
import { sendMessage, changeValue, getMessagesById } from "../../store"
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

  handleChangeInput = (event) => {
    const { changeValue, match } = this.props
    const { id } = match.params

    changeValue(id, event?.target.value || "")
  }

  handleSendMessage = () => {
    const { sendMessage, value, match } = this.props
    const { id } = match.params

    sendMessage({ author: "User", message: value, roomId: id })

    this.handleChangeInput()
  }

  handleScrollBottom = () => {
    if (this.ref.current) {
      this.ref.current.scrollTo(0, this.ref.current.scrollHeight)
    }
  }

  getMessages = () => {
    const { match, getMessagesById } = this.props
    const { id } = match.params

    getMessagesById(id)
  }

  componentDidUpdate(prevProps) {
    const prevId = prevProps.match.params.id
    const id = this.props.match.params.id

    if (prevId !== id) {
      // @TODO сделать проверку, что данных еще нет
      this.getMessages()
    }

    this.handleScrollBottom()
  }

  componentDidMount() {
    this.getMessages()
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
          onChange={this.handleChangeInput}
          onKeyPress={this.handlePressInput}
          placeholder="Введите сообщение..."
          endAdornment={
            value && (
              <InputAdornment position="end">
                <Send
                  className={styles.icon}
                  onClick={this.handleSendMessage}
                />
              </InputAdornment>
            )
          }
        />
      </>
    )
  }
}

const mapStateToProps = (state, props) => {
  const { id } = props.match.params

  return {
    messages: state.messagesReducer.messages[id] || [],
    value:
      state.conversationsReducer.conversations.find(
        (conversation) => conversation.title === id,
      )?.value || "",
  }
}

const mapDispachToProps = (dispatch) => ({
  sendMessage: (params) => dispatch(sendMessage(params)),
  changeValue: (id, value) => dispatch(changeValue(id, value)),
  getMessagesById: (id) => dispatch(getMessagesById(id)),
})

export const MessageList = connect(
  mapStateToProps,
  mapDispachToProps,
)(MessageListView)
