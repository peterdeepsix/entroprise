import React, { useState, useEffect } from "react"
import clsx from "clsx"

import { makeStyles } from "@material-ui/core/styles"
import { Avatar, Chip } from "@material-ui/core"
import CallOutlinedIcon from "@material-ui/icons/CallOutlined"

import LinkComponent from "src/components/LinkComponent/LinkComponent"

const useStyles = makeStyles((theme) => ({
  chip: {
    width: 144,
    height: 32,
  },
}))

const TreeChip = ({ name, color, status, uid }) => {
  const classes = useStyles()
  const isAvailable = true

  const handleClickOpen = () => {
    console.info("nodeData")
  }

  const handleDelete = () => {
    console.info("nodeData")
  }

  return (
    <>
      <Chip
        className={classes.chip}
        component={LinkComponent}
        to={`/app/thread/${uid}`}
        color={(status.state == "online" && "primary") || "default"}
        avatar={<Avatar alt="Parent" />}
        label={name}
        onClick={handleClickOpen}
        onDelete={handleClickOpen}
        deleteIcon={<CallOutlinedIcon />}
      />
    </>
  )
}

export default TreeChip
