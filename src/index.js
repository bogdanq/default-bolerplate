// import { Test } from "@components/app"
import { ThemeProvider, createMuiTheme } from "@material-ui/core"
import React, { Component } from "react"
import ReactDOM from "react-dom"
import { MessageList, Layout, ChatList } from "./components"
// import styles from "./index.module.css"

import "./index.css"

class App extends Component {
  render() {
    return (
      <div>
        <h1>Сообщения</h1>
        <MessageList />
      </div>
    )
  }
}

const dark = {
  color: "red",
}

const theme = createMuiTheme(dark)

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Layout messages={<App />} />
    <ChatList />
  </ThemeProvider>,
  document.getElementById("root"),
)
