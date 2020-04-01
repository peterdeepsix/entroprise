import React, { useState, useEffect } from "react"
import clsx from "clsx"

import { makeStyles } from "@material-ui/core/styles"
import { Avatar, Chip } from "@material-ui/core"
import CallOutlinedIcon from "@material-ui/icons/CallOutlined"

const useStyles = makeStyles(theme => ({}))

const TreeChip = ({ nodeData, handleClickOpen }) => {
  const classes = useStyles()
  const { name, attributes } = nodeData
  const { isOnline, isAvailable } = attributes
  const [color, setColor] = useState("default")

  useEffect(() => {
    if (isOnline === "true") {
      setColor("secondary")
    }
    if (isAvailable === "true") {
      setColor("primary")
    }
  }, [])

  const handleDelete = () => {
    console.info(nodeData)
  }

  return (
    <>
      <Chip
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
