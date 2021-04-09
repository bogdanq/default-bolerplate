import { ThemeProvider, createMuiTheme } from "@material-ui/core"
import { ConnectedRouter } from "connected-react-router"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { Switch, Route } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"
import { ChatPage } from "./pages/chat"
import { store, persistor, history } from "./store"
import "./index.css"

const dark = {
  color: "red",
}

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
            <Route path="*" component={() => <h1>404</h1>} />
          </Switch>
        </ThemeProvider>
      </PersistGate>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root"),
)
