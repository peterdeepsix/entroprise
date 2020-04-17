import React, { useState, useCallback, useEffect } from "react"
import { navigate } from "gatsby"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import { Button } from "@material-ui/core"

import Loadable from "@loadable/component"
import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const ThreadDialog = Loadable(() => import("./ThreadDialog"), {
  fallback: <IndefiniteLoading message="ThreadDialog" />,
})

const Room = Loadable(() => import("./Room"), {
  fallback: <IndefiniteLoading message="Room" />,
})

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const VideoChat = ({ target, user }) => {
  const classes = useStyles()
  const { uid } = user
  const [token, setToken] = useState()
  const [open, setOpen] = useState(true)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    handleLogout()
    navigate(`/app/tree`)
  }

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
    if (!open) handleOpen()
  }, [token, open])

  return (
    <>
      <ThreadDialog user={user} open={open} handleClose={handleClose}>
        {token && open && (
          <Room roomName={target} token={token} handleLogout={handleLogout} />
        )}
      </ThreadDialog>
    </>
  )
}

export default VideoChat
