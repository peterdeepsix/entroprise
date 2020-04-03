import React from "react"

import { makeStyles } from "@material-ui/core/styles"
import { Box } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  video: { width: "100%" },
}))

const VideoStream = ({ muted, stream }) => {
  const classes = useStyles()

  const setVideoRef = videoElement => {
    if (videoElement) {
      videoElement.srcObject = stream
    }
  }

  return (
    <Box>
      <video
        className={classes.video}
        muted={muted}
        autoPlay={true}
        ref={setVideoRef}
      />
    </Box>
  )
}
export default VideoStream
