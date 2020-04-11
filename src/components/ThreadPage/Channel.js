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
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  Toolbar,
} from "@material-ui/core"
import AvatarGroup from "@material-ui/lab/AvatarGroup"
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined"
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined"
import MoreVertIcon from "@material-ui/icons/MoreVert"

import Loadable from "@loadable/component"
import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const ChannelDrawer = Loadable(() => import("./ChannelDrawer"), {
  fallback: <IndefiniteLoading message="ChannelDrawer" />,
})

const useStyles = makeStyles((theme) => ({
  chat: { height: 180 },
  box: { paddingLeft: theme.spacing(1) },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const Channel = ({ closeThread, user }) => {
  const classes = useStyles()
  const theme = useTheme()

  const [value, setValue] = useState("")

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
      {!open && (
        <Button
          startIcon={<ChatOutlinedIcon />}
          variant="outlined"
          color="inherit"
          onClick={toggleDrawer}
        >
          Enable Chat
        </Button>
      )}

      <ChannelDrawer
        className={classes.drawer}
        open={open}
        handleOpen={toggleDrawer}
        handleClose={handleClose}
      >
        <Container disableGutters>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              onClick={closeThread}
            >
              <ArrowBackOutlinedIcon />
            </IconButton>
            <ListItemText
              primaryTypographyProps={{ style: theme.typography.body2 }}
              secondaryTypographyProps={{ style: theme.typography.caption }}
              className={classes.title}
              primary="Product Team"
              secondary="4 Active"
            ></ListItemText>

            <AvatarGroup max={2}>
              <Avatar alt="Remy Sharp" />
              <Avatar alt="Travis Howard" />
              <Avatar alt="Cindy Baker" />
              <Avatar alt="Cindy Baker" />
            </AvatarGroup>
            <IconButton edge="end">
              <MoreVertIcon />
            </IconButton>
          </Toolbar>

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
