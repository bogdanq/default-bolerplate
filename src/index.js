import { ThemeProvider, createMuiTheme } from "@material-ui/core"
import { ConnectedRouter } from "connected-react-router"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { Switch, Route, Redirect } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"
import { ChatPage } from "./pages/chat"
import { store, persistor, history } from "./store"
import "./index.css"
import { foo } from "./utils/foo"

const dark = {
  color: "red",
}

console.log("foo(1,2)", foo(1, 2))

const theme = createMuiTheme(dark)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route
              path="/chat"
              component={(params) => <ChatPage {...params} />}
            />
            <Route path="*" component={() => <Redirect to="/chat" />} />
          </Switch>
        </ThemeProvider>
      </PersistGate>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root"),
)
