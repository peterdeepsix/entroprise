import React, { useEffect, useRef, useState } from "react"
import firebase from "gatsby-plugin-firebase"
import { useListVals } from "react-firebase-hooks/database"
import Tree from "react-d3-tree"

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

const TreeChip = Loadable(() => import("./TreeChip"), {
  fallback: <IndefiniteLoading message="TreeChip" />,
})

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}))

const treeData = [
  {
    name: "Parent",
    attributes: {
      isOnline: "true",
      isAvailable: "false",
    },
    children: [
      {
        name: "Child",
        attributes: {
          isOnline: "false",
          isAvailable: "false",
        },

        children: [
          {
            name: "Deep Child",
            attributes: {
              isOnline: "false",
              isAvailable: "false",
            },
          },
          {
            name: "Deep Child",
            attributes: {
              isOnline: "true",
              isAvailable: "true",
            },

            children: [
              {
                name: "Deepest Child",
                attributes: {
                  isOnline: "false",
                  isAvailable: "false",
                },
              },
            ],
          },
          {
            name: "Deep Child",
            attributes: {
              isOnline: "true",
              isAvailable: "true",
            },
          },
        ],
      },
      {
        name: "Child",
        attributes: {
          isOnline: "true",
          isAvailable: "true",
        },
      },
    ],
  },
]

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const TreePageComponent = () => {
  const classes = useStyles()

  const [translate, setTranslate] = useState(null)
  const [open, setOpen] = React.useState(false)

  const treeRef = useRef(null)

  useEffect(() => {}, [])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box mt={2} mb={10}>
      <Typography> Tree</Typography>
    </Box>
  )
}
export default TreePageComponent
