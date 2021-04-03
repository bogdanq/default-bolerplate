import { ChatList, Header, Layout, MessageList } from "@components"
import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import { MessageProvider } from "../components"

// @TODO пропсы
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
          {(params) => {
            return (
              <MessageProvider {...params}>
                {([state, actions]) => (
                  <Layout
                    header={<Header />}
                    chats={
                      <ChatList
                        {...params}
                        conversations={state.conversations}
                      />
                    }
                  >
                    <Route path="/chat/:id">
                      <MessageList {...state} {...actions} />
                    </Route>
                    <Route exact={true} path="/chat">
                      <h1>Выберите чат</h1>
                    </Route>
                  </Layout>
                )}
              </MessageProvider>
            )
          }}
        </Route>
        <Route path="*" component={() => <h1>такого чата нет</h1>} />
      </Switch>
    )
  }
}
