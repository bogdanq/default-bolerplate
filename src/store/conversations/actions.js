import { ADD_CONVERSATION } from "./types"

export const addConversation = (contact, hasConversation) => {
  return {
    type: hasConversation ? null : ADD_CONVERSATION,
    payload: contact,
  }
}

// @TODO добавить changeValue action
