import React, { useState, useCallback } from "react"
import Lobby from "./Lobby"
import Room from "./Room"

const VideoChat = ({ user }) => {
  const { uid } = user
  const [roomName, setRoomName] = useState("default")
  const [token, setToken] = useState()

  const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value)
  }, [])

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault()

      async function fetchAsync() {
        let response = await fetch(
          "https://us-central1-entroprise-production.cloudfunctions.net/token",
          {
            method: "POST",
            body: JSON.stringify({
              identity: uid,
              roomName: roomName,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        let data = await response.json()
        return data
      }

      fetchAsync()
        .then(data => {
          setToken(data.token)
        })
        .catch(reason => console.log(reason.message))
    },
    [roomName, uid]
  )

  const handleLogout = useCallback(event => {
    setToken(null)
  }, [])

  let render
  if (token) {
    console.log(token)
    render = (
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    )
  } else {
    render = (
      <Lobby
        roomName={roomName}
        handleRoomNameChange={handleRoomNameChange}
        handleSubmit={handleSubmit}
      />
    )
  }
  return render
}

export default VideoChat
