import { MESSAGE_SEND, sendMessage } from "../messages"

export const botSendMessage = (store) => (next) => (action) => {
  if (action.type === MESSAGE_SEND) {
    if (action.payload.author === "User") {
      setTimeout(() => {
        store.dispatch(
          sendMessage({
            author: "Bot",
            message: "Привет, я бот !",
            roomId: action.payload.roomId,
          }),
        )
      }, 500)
    }
  }

  return next(action)
}
