import { ADD_CONVERSATION, CHANGE_VALUE } from "./types"

export const addConversation = (contact) => {
  return {
    type: ADD_CONVERSATION,
    payload: contact,
  }
}

// @TODO добавить changeValue action

export const changeValue = (id, value) => {
  return {
    type: CHANGE_VALUE,
    payload: { id, value },
  }
}

// @TODO сделать екшен для удаления комнаты
