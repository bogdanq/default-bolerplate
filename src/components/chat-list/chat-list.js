import { List } from "@material-ui/core"
import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Chat } from "./chat"

// @TODO пофиксить пропсы
export class ChatList extends Component {
  render() {
    const { conversations, match } = this.props

    const chatId = match?.params.id || ""

    return (
      <List component="nav">
        {conversations.map((chat) => (
          <Link key={chat.title} to={`/chat/${chat.title}`}>
            <Chat title={chat.title} selected={chatId === chat.title} />
          </Link>
        ))}
      </List>
    )
  }
}
