import React, { useEffect, useState, useRef } from "react"
import Loadable from "@loadable/component"
import ReactInterval from "react-interval"
import useUserMedia from "react-use-user-media"

import firebase from "gatsby-plugin-firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import * as blazeface from "@tensorflow-models/blazeface"
import * as tf from "@tensorflow/tfjs-core"
import * as tfjsWasm from "@tensorflow/tfjs-backend-wasm"

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
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

import IndefiniteLoading from "src/components/loading/indefiniteLoading"
import { set } from "mobx"

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
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  video: { width: "100%" },
}))

const constraints = { video: true, audio: false }

const WebRTC = ({ user }) => {
  const classes = useStyles()

  const [isPredicting, setIsPredicting] = useState(false)
  const [confidenceScore, setConfidenceScore] = useState()

  const { state, stream } = useUserMedia(constraints)
  const videoRef = useRef()

  useEffect(() => {
    if (state !== "resolved" || !stream) {
      return
    }

    videoRef.current.srcObject = stream
    videoRef.current.play()
  }, [state, stream])

  const handleClickUser = () => {
    console.log("call user")
  }

  const handleDetectFaces = async () => {
    setIsPredicting(true)
    setConfidenceScore(null)
    const model = await blazeface.load()
    const predictions = await model.estimateFaces(videoRef.current)
    if (predictions.length > 0) {
      predictions.forEach(prediction => {
        console.log(prediction)
        setConfidenceScore(prediction.probability[0])
      })
    }
    setIsPredicting(false)
  }

  if (state === "pending") {
    return <IndefiniteLoading message="Video" />
  }

  if (state === "rejected") {
    return <p>Error {state}</p>
  }

  return (
    <>
      <Box mt={2} mb={1}>
        <Card variant="outlined">
          <CardHeader title="User Status" />

          <CardContent>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-content"
                id="panel-header"
              >
                <Typography className={classes.heading}>
                  Confidence {user.displayName} is Online:
                  {confidenceScore && <> {confidenceScore.toFixed(2) * 100}%</>}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {stream && (
                  <>
                    <video
                      className={classes.video}
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                    />
                    <ReactInterval
                      timeout={1000}
                      enabled={true}
                      callback={handleDetectFaces}
                    />
                  </>
                )}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </CardContent>
        </Card>
      </Box>
      <Box mt={2} mb={10}>
        <UsersList callUser={handleClickUser} />
      </Box>
    </>
  )
}
export default WebRTC
