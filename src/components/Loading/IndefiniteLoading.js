import React from "react"
import LinearProgress from "@material-ui/core/LinearProgress"
import CircularProgress from "@material-ui/core/CircularProgress"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

const IndefiniteLoading = (props) => {
  const { isCircular, message } = props

  return (
    (isCircular && (
      <Box m={2}>
        <CircularProgress />
        {message}
      </Box>
    )) || (
      <Box m={2}>
        <LinearProgress />
        <Typography variant="caption" display="block" gutterBottom>
          Loading {message} ...
        </Typography>
      </Box>
    )
  )
}

export default IndefiniteLoading
