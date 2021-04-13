const cors = require("cors")
const express = require("express")

const server = express()

server.use(cors())

const conversations = [
  { title: "room1", value: "" },
  { title: "test-room2", value: "" },
  { title: "room3", value: "" },
]

const messages = {
  room1: [
    { author: "User", message: "test!", createdTs: new Date() },
    { author: "Bot", message: "Привет, я бот!", createdTs: new Date() },
  ],
  room3: [
    { author: "User", message: "test!", createdTs: new Date() },
    { author: "Bot", message: "Привет, я бот!", createdTs: new Date() },
  ],
}

const getConversations = (request, response) => {
  response.status(200).send(conversations)
}

const getMessagesById = (request, response) => {
  const { id } = request.params

  response.status(200).send({ messages: messages[id] || [], roomId: id })
}

server.get("/conversations", getConversations)
server.get("/messages/:id", getMessagesById)

server.listen("8000", () => console.log("port 8000"))
