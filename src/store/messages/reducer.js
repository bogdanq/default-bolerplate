import { MESSAGE_SEND } from "./types"

const initialState = {
  room1: [
    { author: "User", message: "test!", createdTs: new Date() },
    { author: "Bot", message: "Привет, я бот!", createdTs: new Date() },
  ],
}

export const messagesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case MESSAGE_SEND:
      return {
        ...state,
        [payload.roomId]: [
          ...(state[payload.roomId] || []),
          {
            author: payload.author,
            message: payload.message,
            createdTs: new Date(),
          },
        ],
      }
    default:
      return state
  }
}
