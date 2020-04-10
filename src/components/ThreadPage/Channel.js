import React, { useState, useCallback } from "react"
import firebase from "gatsby-plugin-firebase"
import { useListVals } from "react-firebase-hooks/database"
import { useCollection } from "react-firebase-hooks/firestore"
import { GiftedChat } from "react-web-gifted-chat"
import Chat from "twilio-chat"

import { makeStyles } from "@material-ui/core/styles"
import { Box, Button } from "@material-ui/core"

import Loadable from "@loadable/component"
import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const ChannelDrawer = Loadable(() => import("./ChannelDrawer"), {
  fallback: <IndefiniteLoading message="ChannelDrawer" />,
})

const useStyles = makeStyles((theme) => ({
  chat: { height: "60vh" },
}))

const Channel = ({ user }) => {
  const classes = useStyles()

  const { uid } = user

  const [users] = useCollection(firebase.firestore().collection("users"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  const [messages, messagesLoading, messagesError] = useListVals(
    firebase.database().ref("messages")
  )

  const [chatClient, setChatClient] = useState(null)

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault()

      async function fetchAsync() {
        let response = await fetch(
          "https://us-central1-entroprise-production.cloudfunctions.net/chat",
          {
            method: "POST",
            body: JSON.stringify({
              identity: uid,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        let data = await response.json()
        console.log("data", data.token)

        let client = await new Chat(data.token)
        // console.log("client", client)
        return client
      }

      fetchAsync()
        .then((client) => {
          console.log(client)
          setChatClient(client)
        })
        .catch((reason) => console.log(reason.message))
    },
    [uid]
  )

  const handleLogout = useCallback((event) => {
    setChatClient(null)
  }, [])

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

  const [open, setOpen] = useState(true)

  const handleOpen = () => {
    // console.log("open", open)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const toggleDrawer = (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }

    setOpen(true)
  }

  return (
    <>
      <Button variant="outlined" color="primary" onClick={toggleDrawer}>
        Open Channel
      </Button>
      <Button onClick={handleSubmit}>Get Chat Token</Button>
      <ChannelDrawer
        className={classes.drawer}
        open={open}
        handleOpen={toggleDrawer}
        handleClose={handleClose}
      >
        <Box className={classes.chat}>
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
      </ChannelDrawer>
    </>
  )
}
export default Channel
