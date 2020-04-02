import React from "react"

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  root: {},
}))

const VideoStream = ({ muted, stream }) => {
  const classes = useStyles()

  const setVideoRef = videoElement => {
    if (videoElement) {
      videoElement.srcObject = stream
    }
  }

  return <video muted={muted} autoPlay={true} ref={setVideoRef} />
}
export default VideoStream
