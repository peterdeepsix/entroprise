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

const VideoChat = Loadable(() => import("./VideoChat"), {
  fallback: <IndefiniteLoading message="VideoChat" />,
})

const useStyles = makeStyles(theme => ({
  root: {},
}))

const ServicePageComponent = ({ user }) => {
  const classes = useStyles()

  return (
    <>
      <VideoChat user={user} />
    </>
  )
}
export default ServicePageComponent
