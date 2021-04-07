import { createSelector } from "reselect"

// @TODO использовать селектор для вывода value
export const valueSelector = createSelector(
  (state) => state.conversationsReducer,
  (_, props) => props.match.params.id,
  (conversations, id) => {
    return (
      conversations.find((conversation) => conversation.title === id)?.value ||
      ""
    )
  },
)
