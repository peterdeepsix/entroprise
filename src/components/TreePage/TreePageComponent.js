import React, { useEffect, useRef, useState } from "react"
import WebCola from "react-cola"
import firebase from "gatsby-plugin-firebase"
import { useListVals } from "react-firebase-hooks/database"

import { makeStyles } from "@material-ui/core/styles"
import {
  Typography,
  Container,
  Box,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  AppBar,
  Toolbar,
  Slide,
  Button,
  IconButton,
} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import CallEndOutlinedIcon from "@material-ui/icons/CallEndOutlined"

import Loadable from "@loadable/component"
import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const Tree = Loadable(() => import("./Tree"), {
  fallback: <IndefiniteLoading message="Tree" />,
})

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const TreePageComponent = () => {
  const classes = useStyles()

  useEffect(() => {}, [])

  return (
    <Box mt={2} mb={10}>
      <Tree />
    </Box>
  )
}
export default TreePageComponent
