import {
  ADD_CONVERSATION,
  CHANGE_VALUE,
  GET_CONVERSATION_SUCCESS,
  GET_CONVERSATION_ERROR,
  GET_CONVERSATION_PENDING,
} from "./types"

export const addConversation = (contact) => {
  return {
    type: ADD_CONVERSATION,
    payload: contact,
  }
}

export const changeValue = (id, value) => {
  return {
    type: CHANGE_VALUE,
    payload: { id, value },
  }
}

export const getConversations = () => async (dispatch, getState, request) => {
  dispatch({ type: GET_CONVERSATION_PENDING })

  try {
    const { data } = await request.get("conversations")
    dispatch({ type: GET_CONVERSATION_SUCCESS, payload: data })
  } catch {
    dispatch({ type: GET_CONVERSATION_ERROR })
  }
}
