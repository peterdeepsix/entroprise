import React, { useState, useEffect } from "react"
import firebase from "gatsby-plugin-firebase"
import { useListVals } from "react-firebase-hooks/database"
import { useCollection } from "react-firebase-hooks/firestore"
import { GiftedChat } from "react-web-gifted-chat"

import { Box, Card, CardHeader, CardContent } from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  chat: { height: "60vh" },
}))

const Channel = ({ user }) => {
  const classes = useStyles()

  const [users] = useCollection(firebase.firestore().collection("users"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  const [messages, messagesLoading, messagesError] = useListVals(
    firebase.database().ref("messages")
  )

  const onSend = (messages) => {
    for (const message of messages) {
      saveMessage(message)
    }
  }

  const saveMessage = (message) => {
    return firebase
      .database()
      .ref("/messages/")
      .push(message)
      .catch((error) => {
        console.error("Error saving message to Database:", error)
      })
  }

  return (
    <Box className={classes.chat} mb={10}>
      <GiftedChat
        showUserAvatar
        messages={messages.slice().reverse()}
        onSend={(messages) => onSend(messages)}
        user={{
          id: user.uid,
          name: user.displayName,
          avatar: user.photoURL,
        }}
      />
    </Box>
  )
}
export default Channel
