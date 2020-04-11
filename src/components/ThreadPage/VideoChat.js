import React, { useState, useCallback, useEffect } from "react"
import Loadable from "@loadable/component"
import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

import { Button } from "@material-ui/core"

const Room = Loadable(() => import("./Room"), {
  fallback: <IndefiniteLoading message="Room" />,
})

const VideoChat = ({ target, user }) => {
  const { uid } = user
  const [token, setToken] = useState()

  const handleSubmit = useCallback(async () => {
    async function fetchAsync() {
      let response = await fetch(
        "https://us-central1-entroprise-production.cloudfunctions.net/token",
        {
          method: "POST",
          body: JSON.stringify({
            identity: uid,
            roomName: target,
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
      .then((data) => {
        setToken(data.token)
      })
      .catch((reason) => console.log(reason.message))
  }, [target, uid])

  const handleLogout = useCallback((event) => {
    setToken(null)
  }, [])

  useEffect(() => {
    handleSubmit()
  }, [token])

  if (token)
    return <Room roomName={target} token={token} handleLogout={handleLogout} />
  return null
}

export default VideoChat
