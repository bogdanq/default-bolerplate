const bodyParser = require("body-parser")
const cors = require("cors")
const express = require("express")

const server = express()

server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

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

const sendMessage = (req, rs) => {
  const { message, author, roomId } = req.body

  // author обычно не передают, потому что на беке в сессии он есть и так
  messages[roomId].push({ message, author, createdTs: new Date() })

  // или вернуть boolean
  // можно вернуть только новое сообщение или все сообщения комнаты
  rs.status(200).send(messages[roomId])
}

server.post("/send-message", sendMessage)
server.get("/conversations", getConversations)
server.get("/messages/:id", getMessagesById)
server.de

server.listen("8000", () => console.log("port 8000"))
