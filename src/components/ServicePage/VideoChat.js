import React, { useState, useCallback } from "react"
import Lobby from "./Lobby"
import Room from "./Room"

const VideoChat = ({ user }) => {
  const { username } = user
  const [roomName, setRoomName] = useState("defaultRoom")
  const [token, setToken] = useState(null)

  const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value)
  }, [])

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault()

      async function fetchAsync() {
        // await response of fetch call
        let response = await fetch(
          "https://us-central1-entroprise-production.cloudfunctions.net/token",
          {
            method: "POST",
            body: JSON.stringify({
              identity: username,
              roomName: roomName,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        // only proceed once promise is resolved
        let data = await response.json()
        // only proceed once second promise is resolved
        return data
      }

      fetchAsync()
        .then(data => {
          console.log(data)
          setToken(data.token)
        })
        .catch(reason => console.log(reason.message))
    },
    [roomName, username]
  )

  const handleLogout = useCallback(event => {
    setToken(null)
  }, [])

  let render
  if (token) {
    render = (
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    )
  } else {
    render = (
      <Lobby
        username={username}
        roomName={roomName}
        handleRoomNameChange={handleRoomNameChange}
        handleSubmit={handleSubmit}
      />
    )
  }
  return render
}

export default VideoChat
