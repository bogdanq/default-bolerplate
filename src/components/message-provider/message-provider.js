import { Component } from "react"

export class MessageProvider extends Component {
  state = {
    conversations: [
      {
        title: "room1",
        value: "",
        lastMessage: { author: "User", message: "Hi!", createdTs: new Date() },
      },
      {
        title: "room2",
        value: "",
        lastMessage: { author: "User", message: "Hi!", createdTs: new Date() },
      },
    ],
    messages: {
      room1: [{ author: "User", message: "Hi!", createdTs: new Date() }],
    },
  }

  handleChangeValue = (value) => {
    const {
      match: { params },
    } = this.props

    this.setState({
      conversations: this.state.conversations.map((conversation) => {
        if (conversation.title === params.id) {
          return { ...conversation, value }
        }

        return conversation
      }),
    })
  }

  sendMessage = ({ author, message }) => {
    if (!message) {
      return
    }

    const {
      match: { params },
    } = this.props

    const newMessage = { author, message, createdTs: new Date() }

    this.setState({
      conversations: this.state.conversations.map((conversation) => {
        if (conversation.title === params.id) {
          return { ...conversation, lastMessage: newMessage, value: "" }
        }

        return conversation
      }),
      messages: {
        ...this.state.messages,
        [params.id]: [...(this.state.messages[params.id] || []), newMessage],
      },
    })
  }

  componentDidUpdate() {}

  render() {
    const { children, match } = this.props
    const { messages, conversations } = this.state

    const { id } = match.params ?? {}

    const state = {
      conversations,
      messages: messages[id] ?? [],
      value:
        conversations.find((conversation) => conversation.title === id)
          ?.value || "",
    }

    const actions = {
      handleChangeValue: this.handleChangeValue,
      sendMessage: this.sendMessage,
    }

    return children([state, actions])
  }
}
