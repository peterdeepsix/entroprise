import React, { useEffect, useState } from "react"
import Loadable from "@loadable/component"

import firebase from "gatsby-plugin-firebase"
import { useAuthState } from "react-firebase-hooks/auth"

import { makeStyles } from "@material-ui/core/styles"
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core"

import IndefiniteLoading from "src/components/loading/indefiniteLoading"

const UsersList = Loadable(() => import("./UsersList"), {
  fallback: <IndefiniteLoading message="UsersList" />,
})

const RoomDialog = Loadable(() => import("./RoomDialog"), {
  fallback: <IndefiniteLoading message="RoomDialog" />,
})

const VideoStream = Loadable(() => import("./VideoStream"), {
  fallback: <IndefiniteLoading message="VideoStream" />,
})

const useStyles = makeStyles(theme => ({
  root: {},
}))

const WebRTC = () => {
  const [remoteVideoStream, setRemoteVideoStream] = useState(null)
  const [localVideoStream, setLocalVideoStream] = useState(null)

  const [open, setOpen] = useState(false)
  const [isCalling, setIsCalling] = useState(false)

  useEffect(() => {
    return () => {
      if (!localVideoStream) {
        return
      }
      console.log("Cleaning up stream.", localVideoStream)
      const tracks = localVideoStream.getTracks()
      tracks.forEach(track => {
        track.stop()
      })
    }
  }, [localVideoStream])

  const initCall = async doc => {
    setOpen(true)
    const data = doc.data()
    const mediaStream = getMediaStream()
    console.log("data", data)
    console.log("mediaStream", mediaStream)
  }

  const getMediaStream = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        // audio: true,
        video: true,
      })
      setLocalVideoStream(mediaStream)
      return mediaStream
    } catch (error) {
      console.error(error)
    }
  }

  const cleanupMediaStream = () => {
    if (!localVideoStream) {
      return
    }
    console.log("Cleaning up stream.", localVideoStream)
    const tracks = localVideoStream.getTracks()
    tracks.forEach(track => {
      track.stop()
    })
  }

  const handleClose = () => {
    cleanupMediaStream()
    setOpen(false)
  }

  return (
    <>
      <UsersList callUser={initCall} />
      {isCalling && <IndefiniteLoading message="isCalling" />}
      <RoomDialog handleClose={handleClose} open={open}>
        {/* <VideoStream stream={remoteVideoStream} /> */}
        <VideoStream muted={true} stream={localVideoStream} />
        <VideoStream muted={true} stream={localVideoStream} />
      </RoomDialog>
    </>
  )
}
export default WebRTC
