import React, { useState, useEffect } from "react"

import firebase from "gatsby-plugin-firebase"
import { useAuthState } from "react-firebase-hooks/auth"

import { makeStyles } from "@material-ui/core/styles"
import CloseIcon from "@material-ui/icons/Close"
import { Container, Snackbar, IconButton } from "@material-ui/core"

import Loadable from "@loadable/component"
import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"
const ThreadPageComponent = Loadable(
  () => import("src/components/ThreadPage/ThreadPageComponent"),
  {
    fallback: <IndefiniteLoading message="ThreadPageComponent" />,
  }
)

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const ThreadPage = () => {
  const classes = useStyles()

  const [user, userLoading, userError] = useAuthState(firebase.auth())

  const [open, setOpen] = useState(false)

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return
    }
    setOpen(false)
  }

  useEffect(() => {
    if (userError) setOpen(true)
  }, [userError])

  return (
    <Container className={classes.root} disableGutters maxWidth="sm">
      {user && <ThreadPageComponent user={user} />}
      {userLoading && <IndefiniteLoading message="UserData" />}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={userError}
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
export default ThreadPage
