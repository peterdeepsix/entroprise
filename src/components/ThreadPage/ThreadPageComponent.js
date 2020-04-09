import React from "react"

import { makeStyles, useTheme } from "@material-ui/core/styles"
import { Box } from "@material-ui/core"

import Loadable from "@loadable/component"
import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const Thread = Loadable(() => import("./Thread"), {
  fallback: <IndefiniteLoading message="Thread" />,
})
const Channel = Loadable(() => import("./Channel"), {
  fallback: <IndefiniteLoading message="Channel" />,
})
const Room = Loadable(() => import("./Room"), {
  fallback: <IndefiniteLoading message="Room" />,
})

const ServicePageComponent = Loadable(
  () => import("src/components/ServicePage/ServicePageComponent"),
  {
    fallback: <IndefiniteLoading message="ServicePageComponent" />,
  }
)

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const ThreadPageComponent = ({ user }) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <Box>
      <Thread />
      <Channel />
      <Room />
      <ServicePageComponent user={user} />
    </Box>
  )
}
export default ThreadPageComponent
