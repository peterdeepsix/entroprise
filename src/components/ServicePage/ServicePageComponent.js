import React from "react"
import Loadable from "@loadable/component"

import { makeStyles } from "@material-ui/core/styles"
import { Box } from "@material-ui/core"

import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const Channels = Loadable(() => import("./Channels"), {
  fallback: <IndefiniteLoading message="Channels" />,
})

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const ServicePageComponent = ({ user }) => {
  const classes = useStyles()

  return (
    <Box mt={2} mb={10}>
      <Channels />
    </Box>
  )
}
export default ServicePageComponent
