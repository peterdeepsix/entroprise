import React, { useEffect, useState, useRef } from "react"
import Loadable from "@loadable/component"

import firebase from "gatsby-plugin-firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import * as facemesh from "@tensorflow-models/facemesh"
import * as tf from "@tensorflow/tfjs-core"
import * as tfjsWasm from "@tensorflow/tfjs-backend-wasm"

import { useUserMedia } from "./useUserMedia"

import { makeStyles } from "@material-ui/core/styles"
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
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

const LocalTracks = Loadable(() => import("./LocalTracks"), {
  fallback: <IndefiniteLoading message="LocalTracks" />,
})

const useStyles = makeStyles(theme => ({
  video: { width: "100%" },
}))

const WebRTC = () => {
  const classes = useStyles()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isCalling, setIsCalling] = useState(false)
  const [isOnline, setIsOnline] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const videoRef = useRef()
  const mediaStream = useUserMedia({
    audio: false,
    video: true,
    video: { width: 300, height: 300 },
  })

  function handleCanPlay() {
    videoRef.current.play()
  }

  const handleClickUser = () => {
    setIsDialogOpen(true)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
  }

  const handleSetIsOnline = () => {
    console.log("setIsOnline")
    setIsOnline(true)
    videoRef.current.play()
  }

  const handleDetectFaces = async () => {
    console.log("handleDetectFaces")
    console.log("model loading")
    const model = await facemesh.load()
    console.log("model loaded")
    console.log("starting prediction")
    const current = videoRef.current
    const predictions = await model.estimateFaces(current)
    console.log("prediction completed")
    if (predictions.length > 0) {
      predictions.forEach(prediction => {
        console.log(prediction.faceInViewConfidence)
        if (prediction.faceInViewConfidence >= 0.8) {
          window.alert("User is Online")
        } else {
          window.alert("User is disconnected.")
        }
      })
    }
  }

  useEffect(() => {
    if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = mediaStream
    }
    return () => {
      if (mediaStream) {
        mediaStream.getTracks()[0].stop()
      }
    }
  }, [mediaStream])

  return (
    <>
      <Box mt={2} mb={1}>
        <Card variant="outlined">
          <CardHeader title="User Status" />
          <video
            ref={videoRef}
            onCanPlay={handleCanPlay}
            playsInline
            muted
            width={"100%"}
          />
          <CardContent>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDetectFaces}
            >
              Predict
            </Button>
          </CardContent>
        </Card>
      </Box>

      <UsersList callUser={handleClickUser} />
      {isCalling && <IndefiniteLoading message="isCalling" />}
      <RoomDialog handleClose={handleDialogClose} open={isDialogOpen}>
        <Box>Call User</Box>
      </RoomDialog>
    </>
  )
}
export default WebRTC
