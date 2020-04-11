import React, { useState, useCallback, useEffect } from "react"
import { navigate } from "gatsby"
import firebase from "gatsby-plugin-firebase"
import { useListVals } from "react-firebase-hooks/database"
import { useCollection } from "react-firebase-hooks/firestore"
import { GiftedChat, MessageText, InputToolbar } from "react-web-gifted-chat"
import Chat from "twilio-chat"
import { useSpeechRecognition } from "react-speech-kit"

import { makeStyles, useTheme } from "@material-ui/core/styles"
import {
  Box,
  Container,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  TextField,
  Typography,
} from "@material-ui/core"
import AvatarGroup from "@material-ui/lab/AvatarGroup"

import Loadable from "@loadable/component"
import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const ChannelDrawer = Loadable(() => import("./ChannelDrawer"), {
  fallback: <IndefiniteLoading message="ChannelDrawer" />,
})

const useStyles = makeStyles((theme) => ({
  chat: { height: 240 },
  box: { paddingLeft: theme.spacing(1) },
}))

const Channel = ({ user }) => {
  const classes = useStyles()
  const theme = useTheme()

  const [value, setValue] = useState("")
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setValue(result)
    },
  })

  const { uid } = user

  const [users] = useCollection(firebase.firestore().collection("users"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  const [messages, messagesLoading, messagesError] = useListVals(
    firebase.database().ref("messages")
  )

  const [chatClient, setChatClient] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(true)
  }, [])

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

    setOpen(!open)
  }
  if (messagesLoading) return <IndefiniteLoading message="Messages" />
  return (
    <>
      <Box mt={3} mb={10}>
        <TextField
          fullWidth
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <Button onMouseDown={listen} onMouseUp={stop}>
          Transcribe Audio
        </Button>
        {listening && <Typography>Transcribing audio ...</Typography>}
        <Button variant="outlined" color="primary" onClick={toggleDrawer}>
          Async Thread
        </Button>
        {/* <Button onClick={() => navigate("/app/tree")}>Exit Thread</Button> */}
      </Box>

      <ChannelDrawer
        className={classes.drawer}
        open={open}
        handleOpen={toggleDrawer}
        handleClose={handleClose}
      >
        <Container disableGutters>
          <ListItem>
            <ListItemText
              primary="Thread Name"
              secondary="Thread Meta Information"
            />
            <ListItemAvatar>
              <AvatarGroup max={3}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Rocky_Mountain_Bull_Elk.jpg/1200px-Rocky_Mountain_Bull_Elk.jpg"
                />
                <Avatar
                  alt="Travis Howard"
                  src="https://gohunt-assets-us-west-2.s3.amazonaws.com/media/bugling-bull-elk_0_1.jpg"
                />
                <Avatar
                  alt="Cindy Baker"
                  src="data:image/jpeg;base64,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"
                />
                <Avatar
                  alt="Cindy Baker"
                  src="data:image/jpeg;base64,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"
                />
              </AvatarGroup>
            </ListItemAvatar>
          </ListItem>
          <Divider />
          <Container className={classes.chat}>
            <GiftedChat
              showUserAvatar
              messages={messages.slice().reverse()}
              onSend={(messages) => onSend(messages)}
              user={{
                id: user.uid,
                name: user.displayName,
                avatar: user.photoURL,
              }}
              renderMessageText={({ currentMessage, ...args }) => {
                return (
                  <MessageText
                    currentMessage={currentMessage}
                    customTextStyle={{ fontFamily: "Muli" }}
                    {...args}
                  />
                )
              }}
              renderInputToolbar={({ ...args }) => {
                return (
                  <InputToolbar
                    containerStyle={{
                      borderTopColor: theme.palette.divider,
                    }}
                    primaryStyle={{
                      fontFamily: "Muli",
                    }}
                    {...args}
                  />
                )
              }}
            />
          </Container>
        </Container>
      </ChannelDrawer>
    </>
  )
}
export default Channel
