import React, { useState } from "react"
import firebase from "gatsby-plugin-firebase"

import { Typography } from "@material-ui/core"

const NotificationsDialog = () => {
  const [title, setTitle] = useState("")
  const [options, setOptions] = useState("")

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
    const title = payload.notification.title
    const options = {
      body: payload.notification.body,
      icon: payload.notification.icon,
      actions: [
        {
          action: payload.fcmOptions.link,
          title: "Notification Test Title",
        },
      ],
    }
    setTitle(title)
    {
      console.log("title", title)
    }
    setOptions(options)
    {
      console.log("options", options)
    }
  })
  return (
    <>
      <Typography>Notifications</Typography>
      <Typography>{title}</Typography>
      <Typography>{options}</Typography>
    </>
  )
}

export default NotificationsDialog
