import React from "react"

import { makeStyles, useTheme } from "@material-ui/core/styles"

import Loadable from "@loadable/component"
import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const Thread = Loadable(() => import("./Thread"), {
  fallback: <IndefiniteLoading message="Thread" />,
})

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const ThreadPageComponent = ({ user }) => {
  const classes = useStyles()
  const theme = useTheme()

  return <Thread user={user} />
}
export default ThreadPageComponent
