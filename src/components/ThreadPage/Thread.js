import React from "react"
import { makeStyles, useTheme } from "@material-ui/core/styles"

import Loadable from "@loadable/component"
import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const VideoChat = Loadable(() => import("./VideoChat"), {
  fallback: <IndefiniteLoading message="VideoChat" />,
})

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const Thread = ({ uid, user }) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <>
      <VideoChat target={uid} user={user} />
    </>
  )
}

export default Thread
