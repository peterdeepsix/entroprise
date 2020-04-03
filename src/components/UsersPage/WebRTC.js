import React, { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import firebase from "gatsby-plugin-firebase"
import Peer from "peerjs"

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
import DuoOutlinedIcon from "@material-ui/icons/DuoOutlined"

import Loadable from "@loadable/component"
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

const WebRTC = ({ uid }) => {
  const [peer, setPeer] = useState(new Peer(uid))
  const [remoteVideoStream, setRemoteVideoStream] = useState(null)
  const [localVideoStream, setLocalVideoStream] = useState(null)
  const [testVideoStream, setTestVideoStream] = useState(null)

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

  const initCall = doc => {
    const data = doc.data()
    // getMediaStream()
    console.log("data", data.uid)
    console.log("peer", peer)
    const conn = peer.connect(data.uid)
  }

  peer.on("connection", conn => {
    conn.on("data", function(data) {
      console.log("Received", data)
    })
    conn.on("open", () => {
      conn.send("hello!")
      console.log("open", open)
    })
  })

  const handleClose = () => {
    cleanupMediaStream()
    setOpen(false)
  }

  const getMediaStream = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        // audio: true,
        video: true,
      })
      setLocalVideoStream(mediaStream)
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

  return (
    <>
      <UsersList callUser={initCall} />
      {isCalling && <IndefiniteLoading message="isCalling" />}
      <RoomDialog handleClose={handleClose} open={open}>
        <VideoStream stream={remoteVideoStream} />
        <VideoStream muted={true} stream={localVideoStream} />
      </RoomDialog>
    </>
  )
}
export default WebRTC
