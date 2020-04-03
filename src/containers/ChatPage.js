import React, { useState, useEffect } from "react"
import Loadable from "@loadable/component"

import firebase from "gatsby-plugin-firebase"
import { useAuthState } from "react-firebase-hooks/auth"

import { makeStyles } from "@material-ui/core/styles"
import { Container, Snackbar, IconButton } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"

import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const ChatPageComponent = Loadable(
  () => import("src/components/ChatPage/ChatPageComponent"),
  {
    fallback: <IndefiniteLoading message="ChatPage" />,
  }
)

const useStyles = makeStyles(theme => ({
  root: {},
}))

const ChatPage = () => {
  const classes = useStyles()

  const [user, loading, error] = useAuthState(firebase.auth())

  const [open, setOpen] = useState(false)

  const handleClose = reason => {
    if (reason === "clickaway") {
      return
    }
    setOpen(false)
  }

  useEffect(() => {
    if (error) setOpen(true)
  }, [error])

  return (
    <Container className={classes.root} maxWidth="sm">
      {user && <ChatPageComponent />}
      {loading && <IndefiniteLoading message="UserData" />}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={error}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Container>
  )
}
export default ChatPage
