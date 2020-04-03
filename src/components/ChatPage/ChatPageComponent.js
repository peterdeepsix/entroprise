import React, { useEffect, useRef, useState, Component } from "react"
import ReactDOM from "react-dom"

import firebase from "gatsby-plugin-firebase"
import { useAuthState } from "react-firebase-hooks/auth"

import { GiftedChat } from "react-web-gifted-chat"

import { makeStyles } from "@material-ui/core/styles"
import {
  Avatar,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  DialogTitle,
  Dialog,
} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"

const useStyles = makeStyles(theme => ({
  root: {},
}))

const ChatPageComponent = () => {
  const classes = useStyles()
  const [messages, setMessages] = useState([])
  const [user, loading, error] = useAuthState(firebase.auth())
  const [open, setOpen] = useState(false)

  useEffect(() => {
    console.log(user)
    if (user) loadMessages()
  }, [])

  const loadMessages = () => {
    const callback = snap => {
      const message = snap.val()
      message.id = snap.key
      const { messages } = messages
      messages.push(message)
      setMessages(messages)
    }
    firebase
      .database()
      .ref("/messages/")
      .limitToLast(12)
      .on("child_added", callback)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSend = messages => {
    for (const message of messages) {
      saveMessage(message)
    }
  }

  const saveMessage = message => {
    return firebase
      .database()
      .ref("/messages/")
      .push(message)
      .catch(function(error) {
        console.error("Error saving message to Database:", error)
      })
  }

  const Chat = () => {
    return (
      <GiftedChat
        user={user}
        messages={messages.slice().reverse()}
        onSend={messages => onSend(messages)}
      />
    )
  }

  const Channels = () => {
    return (
      <List>
        <ListItem button>
          <ListItemAvatar>
            <Avatar>D</Avatar>
          </ListItemAvatar>
          <ListItemText primary="Default" />
        </ListItem>
      </List>
    )
  }

  const ChannelsHeader = () => {
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Channels
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
  const ChatHeader = () => {
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Default channel
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
  const SettingsHeader = () => {
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Settings
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }

  return (
    <>
      <ChannelsHeader />
      <Channels />
      <ChatHeader />
      <Chat />
      <SettingsHeader />
    </>
  )
}
export default ChatPageComponent
