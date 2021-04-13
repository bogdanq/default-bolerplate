import { connectRouter, routerMiddleware } from "connected-react-router"
import { createBrowserHistory } from "history"
import { combineReducers, createStore, applyMiddleware, compose } from "redux"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import thunk from "redux-thunk"
import { request } from "../api"
import { conversationsReducer } from "./conversations"
import { messagesReducer } from "./messages"
import { botSendMessage, logger } from "./middlewares"

export const history = createBrowserHistory()

const config = {
  key: "root",
  storage,
  blacklist: [],
  whitelist: [],
}

// @TODO добавить новый редюсер для профиля (без екшенов, любая информацию о пользователе)

export const store = createStore(
  persistReducer(
    config,
    combineReducers({
      router: connectRouter(history),
      messagesReducer,
      conversationsReducer,
    }),
  ),
  compose(
    applyMiddleware(
      thunk.withExtraArgument(request),
      routerMiddleware(history),
      botSendMessage,
      logger,
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : () => {},
  ),
)

export const persistor = persistStore(store)
