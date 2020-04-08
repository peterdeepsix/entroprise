import React, { useState, useEffect } from "react"
import clsx from "clsx"

import { makeStyles } from "@material-ui/core/styles"
import { Avatar, Chip } from "@material-ui/core"
import CallOutlinedIcon from "@material-ui/icons/CallOutlined"

const useStyles = makeStyles((theme) => ({
  chip: {
    width: 144,
    height: 32,
  },
}))

const TreeChip = ({ name, color, variant }) => {
  const classes = useStyles()
  const isOnline = true
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
        variant={variant}
        className={classes.chip}
        color={color}
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
