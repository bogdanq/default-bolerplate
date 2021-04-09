import { ADD_CONVERSATION, CHANGE_VALUE } from "./types"

const initialState = [
  { title: "room1", value: "" },
  { title: "test-room2", value: "" },
  { title: "room3", value: "" },
]

export const conversationsReducer = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case ADD_CONVERSATION:
      return [...state, { title: payload, value: "" }]
    case CHANGE_VALUE:
      return state.map((room) =>
        room.title === payload.id ? { ...room, value: payload.value } : room,
      )
    default:
      return state
  }
}

// @TODO реагировать удаления комнаты
