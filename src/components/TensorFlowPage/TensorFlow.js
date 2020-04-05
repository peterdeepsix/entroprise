import React, { useEffect, useState, useRef } from "react"
import ReactInterval from "react-interval"
import useUserMedia from "react-use-user-media"
import * as blazeface from "@tensorflow-models/blazeface"

import {
  Box,
  Badge,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@material-ui/core"

import { makeStyles, withStyles } from "@material-ui/core/styles"

import IndefiniteLoading from "src/components/loading/indefiniteLoading"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
  },
  video: { width: "100%" },
}))

const constraints = { video: true, audio: false }

const StyledBadge = withStyles(theme => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge)

const TensorFlow = ({ user }) => {
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

  const handleDetectFaces = async () => {
    setIsPredicting(true)

    const model = await blazeface.load()

    const predictions = await model.estimateFaces(videoRef.current)
    setConfidenceScore(null)
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
      <Box mt={2} mb={10}>
        <Card variant="outlined">
          <CardHeader title="User Status" />
          <CardContent>
            <Box mb={1}>
              <ListItem disableGutters>
                {(confidenceScore >= 0.8 && (
                  <ListItemAvatar>
                    <StyledBadge
                      overlap="circle"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      variant="dot"
                    >
                      <Avatar src={user.photoURL} alt={user.displayName} />
                    </StyledBadge>
                  </ListItemAvatar>
                )) || (
                  <ListItemAvatar>
                    <Avatar src={user.photoURL} alt={user.displayName} />
                  </ListItemAvatar>
                )}
                <ListItemText
                  primary={
                    (user.isAnonymous && "Anonymous User") || user.displayName
                  }
                  secondary={
                    <>
                      Confidence score user is online:
                      {confidenceScore && (
                        <> {confidenceScore.toFixed(2) * 100}%</>
                      )}
                    </>
                  }
                />
              </ListItem>
            </Box>
            <Box mb={1}>
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
                    timeout={2600}
                    enabled={true}
                    callback={handleDetectFaces}
                  />
                </>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}
export default TensorFlow
