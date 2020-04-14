import React, { useState, useEffect } from "react"
import firebase from "gatsby-plugin-firebase"
import { SnackbarProvider, useSnackbar } from "notistack"
import axios from "axios"

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
import ToggleButton from "@material-ui/lab/ToggleButton"
import CloseIcon from "@material-ui/icons/Close"
import FaceIcon from "@material-ui/icons/Face"
import DoneIcon from "@material-ui/icons/Done"
import CheckIcon from "@material-ui/icons/Check"

const ROOT_URL = "https://us-central1-entroprise-production.cloudfunctions.net"

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
  const [hasNotificationPermission, setHasNotificationPermission] = useState(
    false
  )

  /**
   * If registration token is available in localStorage we enable the subscription option to indicate that the user has
   * already subscribed
   */
  useEffect(() => {
    localStorage.getItem("NOTIFICATION_SUBSCRIBED") === "TRUE"
      ? setHasNotificationPermission(true)
      : setHasNotificationPermission(false)
  }, [])

  /**
   * Store app instance tokens in firestore
   * @param {*} token
   */
  const sendTokenToDb = async (token) => {
    try {
      await axios.post(`${ROOT_URL}/storetoken`, { token })
    } catch (error) {
      if (error.response) {
        console.log(error.response.status)
        console.log(error.response.data)
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log("Error: ", error.message)
      }
    }
  }

  /**
   * If there are no active subscriptions then we delete the token from firestore
   */
  const deleteTokenFromDb = async () => {
    try {
      if (localStorage.getItem("NOTIFICATION_SUBSCRIBED") === null) {
        const token = localStorage.getItem("INSTANCE_TOKEN")
        await axios.delete(`${ROOT_URL}/deletetoken`, { data: { token } })
        localStorage.removeItem("INSTANCE_TOKEN")
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.status)
        console.log(err.response.data)
      } else if (err.request) {
        console.log(err.request)
      } else {
        console.log("Error: ", err.message)
      }
    }
  }

  const notificationPermission = async () => {
    let permissionGranted = false
    try {
      /* request permission if not granted */
      if (Notification.permission !== "granted") {
        await messaging.requestPermission()
      }
      /* get instance token if not available */
      if (localStorage.getItem("INSTANCE_TOKEN") !== null) {
        permissionGranted = true
      } else {
        const token = await messaging.getToken() // returns the same token on every invocation until refreshed by browser
        await sendTokenToServer(token)
        localStorage.setItem("INSTANCE_TOKEN", token)
        permissionGranted = true
      }
    } catch (err) {
      console.log(err)
      if (
        err.hasOwnProperty("code") &&
        err.code === "messaging/permission-default"
      )
        console.log("You need to allow the site to send notifications")
      else if (
        err.hasOwnProperty("code") &&
        err.code === "messaging/permission-blocked"
      )
        console.log(
          "Currently, the site is blocked from sending notifications. Please unblock the same in your browser settings"
        )
      else console.log("Unable to subscribe you to notifications")
    } finally {
      return permissionGranted
    }
  }

  /**
   * Send the subscription details (token and topic) to the server endpoint
   */
  const subscriptionActions = async (mode, token, topic) => {
    try {
      return await axios.post(`${ROOT_URL}/${mode}`, { token, topic })
    } catch (error) {
      if (error.response) {
        console.log(error.response.status)
        console.log(error.response.data)
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log("Error: ", error.message)
      }
      return null
    }
  }

  /**
   * Subscribe app instance to notification topic if user permissions given
   */
  const subscribeNotifications = async () => {
    const canNotificationPermission = await notificationPermission()
    if (canNotificationPermission) {
      const isSubscribed = await subscriptionActions(
        "subscribe",
        localStorage.getItem("INSTANCE_TOKEN"),
        "test"
      )
      if (isSubscribed) {
        localStorage.setItem("NOTIFICATION_SUBSCRIBED", "TRUE")
        handleSystemMessage(
          "Push notifications have been enabled for your device."
        )
      } else {
        handleSystemError("Unable to subscribe you to push notifications.")
      }
    }
  }

  /**
   * Unsubscribe app instance from notification topic
   */
  const unsubscribeNotifications = async () => {
    const isUnSubscribed = await subscriptionActions(
      "unsubscribe",
      localStorage.getItem("INSTANCE_TOKEN"),
      "test"
    )
    if (isUnSubscribed) {
      localStorage.removeItem("NOTIFICATION_SUBSCRIBED")
      await deleteTokenFromDb()
      handleSystemMessage("You have been unsubscribed from notifications.")
    } else {
      handleSystemError("Failed to unsubscribe you from push notifications.")
    }
  }

  // Send the Instance ID token your application server, so that it can:
  // - send messages back to this app
  // - subscribe/unsubscribe the token from topics
  async function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer()) {
      console.log("Sending token to server...")
      await sendTokenToDb(token)
      setTokenSentToServer(true)
    } else {
      console.log(
        "Token already sent to server so won't send it again " +
          "unless it changes"
      )
    }
  }

  function isTokenSentToServer() {
    return window.localStorage.getItem("sentToServer") === "1"
  }

  function setTokenSentToServer(sent) {
    window.localStorage.setItem("sentToServer", sent ? "1" : "0")
  }

  let messaging

  // we need to check if messaging is supported by the browser
  if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging()
    messaging
      .getToken()
      .then(async (currentToken) => {
        if (currentToken) {
          console.log("currenttoken", currentToken)
          const storeToken = await subscriptionActions(
            "storetoken",
            localStorage.getItem("INSTANCE_TOKEN"),
            "test"
          )
          if (storeToken) {
            handleSystemMessage("storetoken - sucess")
          } else {
            handleSystemError("storetoken - fail")
          }
          setToken(currentToken)
          // updateUIForPushEnabled(currentToken)
        } else {
          console.log(
            "No Instance ID token available. Request permission to generate one."
          )
          // Show permission UI. Show permission request.
          notificationPermission()

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
          setTokenSentToServer(false)
          // Send Instance ID token to app server.
          sendTokenToServer(refreshedToken)
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
    enqueueSnackbar(newTitle, {
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    })
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

  const handleSystemMessage = (message) => {
    enqueueSnackbar(message, {
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
        <Button
          color="primary"
          variant="contained"
          onClick={subscribeNotifications}
        >
          subscribeNotifications
        </Button>
      </Box>
      <Box m={2}>
        <Button variant="outlined" onClick={unsubscribeNotifications}>
          unsubscribeNotifications
        </Button>
      </Box>
      <Box m={2}>
        <Button color="primary" variant="outlined" onClick={handleMessage}>
          Preview Message
        </Button>
      </Box>
      <Box m={2}>
        <Button color="primary" variant="outlined" onClick={handleAudio}>
          Preview Audio Call
        </Button>
      </Box>
      <Box m={2}>
        <Button color="primary" variant="outlined" onClick={handleVideo}>
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
