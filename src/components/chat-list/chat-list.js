import { List, Button } from "@material-ui/core"
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { AddContactModal } from "../modal"
import { Chat } from "./chat"

// @TODO пофиксить пропсы
export class ChatListView extends Component {
  state = {
    isOpen: false,
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render() {
    const { conversations, match } = this.props
    const { isOpen } = this.state
    const { id } = match.params

    return (
      <>
        <div>
          <List component="nav">
            {conversations.map((chat) => {
              return (
                <Link key={chat.title} to={`/chat/${chat.title}`}>
                  {/* @TODO * добавить отображение последнего сообщения () по желанию */}
                  <Chat selected={chat.title === id} chat={chat} />
                </Link>
              )
            })}
          </List>
        </div>

        <AddContactModal isOpen={isOpen} onClose={this.toggleModal} />

        <Button variant="contained" fullWidth={true} onClick={this.toggleModal}>
          Добавить чат
        </Button>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  conversations: state.conversationsReducer,
  // @TODO - достать сообщения из стора, что бы можно было отобразить последнее сообщение в карточке
})

export const ChatList = connect(mapStateToProps, null)(ChatListView)
