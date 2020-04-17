import React, { useState, useEffect } from "react"
import Loadable from "@loadable/component"

import firebase from "gatsby-plugin-firebase"
import { useAuthState } from "react-firebase-hooks/auth"

import { makeStyles } from "@material-ui/core/styles"
import CloseIcon from "@material-ui/icons/Close"
import { Container, Snackbar, IconButton } from "@material-ui/core"

import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const ListPageComponent = Loadable(
  () => import("src/components/ListPage/ListPageComponent"),
  {
    fallback: <IndefiniteLoading message="ListPageComponent" />,
  }
)

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const ListPage = () => {
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
    <Container className={classes.root} maxWidth="sm">
      {user && <ListPageComponent user={user} />}
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
export default ListPage
