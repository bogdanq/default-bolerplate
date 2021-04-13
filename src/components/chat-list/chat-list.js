import { List, Button } from "@material-ui/core"
import { push } from "connected-react-router"
import React, { Component } from "react"
import { connect } from "react-redux"
import { getConversations } from "../../store"
import { AddContactModal } from "../add-contact-modal"
import { Chat } from "./chat"

export class ChatListView extends Component {
  state = {
    isOpen: false,
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  componentDidMount() {
    this.props.getConversations()
  }

  render() {
    const {
      conversations,
      match,
      messages,
      push,
      conversationsPending,
    } = this.props
    const { isOpen } = this.state
    const { id } = match.params

    return conversationsPending ? (
      <div>
        <h1>Загрузка ..</h1>
      </div>
    ) : (
      <>
        <div>
          <List component="nav">
            {conversations.map((chat) => {
              const msg = messages[chat.title] || []

              return (
                <Chat
                  key={chat.title}
                  selected={chat.title === id}
                  chat={chat}
                  lastMessage={msg[msg.length - 1]}
                  handleNavigate={() => push(`/chat/${chat.title}`)}
                />
              )
            })}
          </List>
        </div>

        <AddContactModal
          isOpen={isOpen}
          onClose={this.toggleModal}
          conversations={conversations}
        />

        <Button variant="contained" fullWidth={true} onClick={this.toggleModal}>
          Добавить чат
        </Button>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  conversations: state.conversationsReducer.conversations,
  conversationsPending: state.conversationsReducer.conversationsPending,
  messages: state.messagesReducer.messages,
})

const mapDispatchToProps = (dispatch) => ({
  push: (link) => dispatch(push(link)),
  getConversations: () => dispatch(getConversations()),
})

export const ChatList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatListView)
