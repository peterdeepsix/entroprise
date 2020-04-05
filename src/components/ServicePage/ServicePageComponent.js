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

const UsersList = Loadable(() => import("./UsersList"), {
  fallback: <IndefiniteLoading message="UsersList" />,
})

const useStyles = makeStyles(theme => ({
  root: {},
}))

const handleClickUser = () => {
  console.log("call user")
}

const ServicePageComponent = ({ user }) => {
  const classes = useStyles()

  return (
    <Box mt={2} mb={10}>
      <VideoChat user={user} />
      <UsersList handleClickUser={handleClickUser} />
    </Box>
  )
}
export default ServicePageComponent
