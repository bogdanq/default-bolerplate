import { ChatList, Header, Layout, MessageList } from "@components"
import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import { MessagesNotFound } from "../components"

export class ChatPage extends Component {
  componentDidMount() {
    document.addEventListener("keydown", this.listenExistChat)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.listenExistChat)
  }

  listenExistChat = ({ code }) => {
    if (code === "Escape") {
      const { history } = this.props
      history.push("/chat")
    }
  }

  render() {
    return (
      <Switch>
        <Route path={["/chat/:id", "/chat"]}>
          {(params) => (
            <>
              {/* @TODO удалили провайдер, потому что вся логика в redux */}
              <Layout header={<Header />} chats={<ChatList {...params} />}>
                <Route path="/chat/:id">
                  <MessageList {...params} />
                </Route>
                <Route exact={true} path="/chat">
                  <MessagesNotFound />
                </Route>
              </Layout>
            </>
          )}
        </Route>
        <Route
          exact={true}
          path="*"
          component={() => <h1>такого чата нет (404)</h1>}
        />
      </Switch>
    )
  }
}
