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
  const classes = useStyles()

  const [user, initialising, error] = useAuthState(firebase.auth())
  const [remoteVideoStream, setRemoteVideoStream] = useState(null)
  const [localVideoStream, setLocalVideoStream] = useState(null)
  const [testVideoStream, setTestVideoStream] = useState(null)
  const [peer, setPeer] = useState(new Peer(user.uid))
  const [open, setOpen] = useState(false)
  const [isCalling, setIsCalling] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [constraints, setConstraints] = useState({
    // audio: true,
    video: true,
  })

  useEffect(() => {
    const getMediaStream = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia(
          constraints
        )
        console.log("Setting stream", mediaStream)
        setLocalVideoStream(mediaStream)
      } catch (error) {
        console.error(error)
      }
    }
    getMediaStream()
  }, [constraints])

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

  const callUser = async id => {
    setIsCalling(true)
    console.log("OUTGOING CALL")
    console.log(id)

    console.log("peer")
    console.log(peer)
    const call = peer.call(id, localVideoStream)

    console.log("call")
    console.log(call)
    call.on("stream", function(remoteStream) {
      setRemoteVideoStream(remoteStream)
      handleClickOpen()
      setIsCalling(false)
    })
  }

  peer.on("disconnected", () => {
    handleClose()
    setIsCalling(false)
  })

  peer.on("call", call => {
    console.log("INCOMING CALL")

    console.log("call")
    console.log(call)
    call.answer(localVideoStream)
    call.on("stream", remoteStream => {
      setRemoteVideoStream(remoteStream)
      handleClickOpen()
      setIsCalling(false)
    })
  })

  return (
    <>
      {isCalling && <IndefiniteLoading message="isCalling" />}
      <Box mt={2}>
        <Card>
          <RoomDialog handleClose={handleClose} open={open}>
            <VideoStream stream={remoteVideoStream} />
            <VideoStream muted={true} stream={localVideoStream} />
          </RoomDialog>
        </Card>
      </Box>
    </>
  )
}
export default WebRTC
