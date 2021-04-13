import {
  MESSAGE_SEND,
  GET_MESSAGE_ERROR,
  GET_MESSAGE_SUCCESS,
  GET_MESSAGE_PENDING,
} from "./types"

const initialState = {
  messages: {},
  messagesPending: false,
  error: null,
}
// @TODO переделать с createReducer
export const messagesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case MESSAGE_SEND:
      return {
        ...state,
        messages: {
          ...state.messages,
          [payload.roomId]: [
            ...(state.messages[payload.roomId] || []),
            {
              author: payload.author,
              message: payload.message,
              createdTs: new Date(),
            },
          ],
        },
      }
    case GET_MESSAGE_PENDING:
      return {
        ...state,
        messagesPending: true,
      }
    case GET_MESSAGE_SUCCESS:
      return {
        ...state,
        messagesPending: false,
        messages: {
          ...state.messages,
          [payload.roomId]: payload.messages,
        },
      }
    case GET_MESSAGE_ERROR:
      return {
        ...state,
        messagesPending: false,
        error: payload,
      }
    default:
      return state
  }
}

// @TODO реагировать удаления комнаты

// @TODO * сделть функцию createReducer
// const reducer = createReducer(initialState, {
//   [MESSAGE_SEND]: (state, action) => ({})
// })
