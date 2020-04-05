import React, { useEffect, useRef, useState } from "react"
import Loadable from "@loadable/component"

import { makeStyles } from "@material-ui/core/styles"
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"

import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"
import { Room } from "twilio-video"

const RoomDialog = Loadable(() => import("./RoomDialog"), {
  fallback: <IndefiniteLoading message="RoomDialog" />,
})

const useStyles = makeStyles(theme => ({
  root: {},
}))

const ServicePageComponent = () => {
  const classes = useStyles()

  return (
    <>
      <Box mt={2} mb={1}>
        <Card variant="outlined">
          <CardHeader title="Rooms" />
          <CardContent>
            <Typography>Rooms</Typography>
          </CardContent>
        </Card>
      </Box>
      <RoomDialog />
    </>
  )
}
export default ServicePageComponent
