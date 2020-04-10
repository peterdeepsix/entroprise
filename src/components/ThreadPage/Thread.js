import React from "react"
import { makeStyles, useTheme } from "@material-ui/core/styles"

import Loadable from "@loadable/component"
import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const Channel = Loadable(() => import("./Channel"), {
  fallback: <IndefiniteLoading message="Channel" />,
})

const Room = Loadable(() => import("./Room"), {
  fallback: <IndefiniteLoading message="Room" />,
})

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const Thread = ({ uid, user }) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <>
      {/* <Room user={user} /> */}
      <Channel user={user} />
    </>
  )
}

export default Thread
