import React, { useState } from "react"
import firebase from "gatsby-plugin-firebase"
import { SnackbarProvider, useSnackbar } from "notistack"

import { makeStyles } from "@material-ui/core/styles"
import {
  Typography,
  Button,
  Snackbar,
  IconButton,
  Chip,
  Avatar,
  Toolbar,
  Box,
} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import FaceIcon from "@material-ui/icons/Face"
import DoneIcon from "@material-ui/icons/Done"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  grow: {
    flexGrow: 1,
  },
}))

const CustomSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar()

  const classes = useStyles()
  const [token, setToken] = useState("")
  const [title, setTitle] = useState("")
  const [options, setOptions] = useState("")
  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false)

  const handleOpenSnackbar = () => {
    setSnackbarIsOpen(true)
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    setSnackbarIsOpen(false)
  }

  let messaging

  // we need to check if messaging is supported by the browser
  if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging()
    messaging
      .getToken()
      .then((currentToken) => {
        if (currentToken) {
          console.log("currentToken", currentToken)
          // sendTokenToServer(currentToken)
          setToken(currentToken)
          // updateUIForPushEnabled(currentToken)
        } else {
          // Show permission request.
          console.log(
            "No Instance ID token available. Request permission to generate one."
          )
          // Show permission UI.
          // updateUIForPushPermissionRequired()
          // setTokenSentToServer(false)
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err)
        // showToken("Error retrieving Instance ID token. ", err)
        // setTokenSentToServer(false)
      })
    // Callback fired if Instance ID token is updated.
    messaging.onTokenRefresh(() => {
      messaging
        .getToken()
        .then((refreshedToken) => {
          console.log("Token refreshed.", refreshedToken)
          // Indicate that the new Instance ID token has not yet been sent to the
          // app server.
          // setTokenSentToServer(false)
          // Send Instance ID token to app server.
          // sendTokenToServer(refreshedToken)
          // ...
        })
        .catch((err) => {
          console.log("Unable to retrieve refreshed token ", err)
          // showToken("Unable to retrieve refreshed token ", err)
        })
    })
  }

  messaging.onMessage((payload) => {
    console.log("payload", payload)
    const newTitle = payload.notification.title
    const newOptions = {
      body: payload.notification.body,
      icon: payload.notification.icon,
      actions: [
        {
          action: payload.fcmOptions.link,
          title: "Notification Test Title",
        },
      ],
    }
    setTitle(newTitle)
    {
      console.log("newTitle", newTitle)
    }
    setOptions(newOptions)
    {
      console.log("newOptions", newOptions)
    }
  })

  const handleSystemError = () => {
    enqueueSnackbar("Error", {
      variant: "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    })
  }

  const handleSystemMessage = () => {
    enqueueSnackbar("System Message", {
      variant: "warning",
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    })
  }

  const handleMessage = () => {
    enqueueSnackbar("Message", {
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    })
  }

  const handleAudio = () => {
    enqueueSnackbar("Audio Call", {
      variant: "info",
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    })
  }

  const handleVideo = () => {
    enqueueSnackbar("Video Call", {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    })
  }

  return (
    <>
      <Box m={2}>
        <Button variant="outlined" onClick={handleSystemError}>
          Preview Error
        </Button>
      </Box>
      <Box m={2}>
        <Button variant="outlined" onClick={handleSystemMessage}>
          Preview System Message
        </Button>
      </Box>
      <Box m={2}>
        <Button variant="outlined" onClick={handleMessage}>
          Preview Message
        </Button>
      </Box>
      <Box m={2}>
        <Button color="primary" variant="outlined" onClick={handleAudio}>
          Preview Audi Call
        </Button>
      </Box>
      <Box m={2}>
        <Button color="primary" variant="contained" onClick={handleVideo}>
          Preview Video Call
        </Button>
      </Box>
    </>
  )
}

const NotificationsDialog = () => {
  return (
    <>
      <SnackbarProvider hideIconVariant={true} maxSnack={3}>
        <CustomSnackbar />
      </SnackbarProvider>
    </>
  )
}

export default NotificationsDialog
