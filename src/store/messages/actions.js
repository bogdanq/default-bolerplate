import { MESSAGE_SEND } from "./types"

// params {author, message, roomId}
export const sendMessage = (params) => {
  return {
    type: MESSAGE_SEND,
    payload: params,
  }
}

// @TODO сделать екшен удаления комнаты
