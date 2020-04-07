import React from "react"
import Loadable from "@loadable/component"

import { makeStyles } from "@material-ui/core/styles"
import { Box } from "@material-ui/core"

import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const MapView = Loadable(() => import("./MapView"), {
  fallback: <IndefiniteLoading message="MapView" />,
})

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const ServicePageComponent = ({ user }) => {
  const classes = useStyles()

  return (
    <Box mt={2} mb={10}>
      <MapView user={user} />
    </Box>
  )
}
export default ServicePageComponent
