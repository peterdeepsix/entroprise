import React, { useEffect } from "react"
import { navigate } from "gatsby"

import { makeStyles } from "@material-ui/core/styles"

import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core"

import VisibilityOutlined from "@material-ui/icons/VisibilityOutlined"
import NaturePeopleOutlinedIcon from "@material-ui/icons/NaturePeopleOutlined"
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined"

const useStyles = makeStyles({
  stickToBottom: {
    width: "100%",
    top: "auto",
    bottom: 0,
  },
})

const LowerNavigation = ({ location }) => {
  const classes = useStyles()
  const [value, setValue] = React.useState("/")

  useEffect(() => {
    if (location) setValue(location.pathname)
  }, [location])

  const handleChange = (event, newValue) => {
    setValue(newValue)
    navigate(newValue)
  }

  return (
    <AppBar
      position="fixed"
      color="primary"
      className={classes.stickToBottom}
      elevation={4}
    >
      <BottomNavigation
        value={value}
        aria-label="BottomNavigation"
        showLabels
        onChange={handleChange}
      >
        <BottomNavigationAction
          value="/app/tensorflow"
          label="Tensor Flow"
          icon={<VisibilityOutlined />}
        />
        <BottomNavigationAction
          value="/app/tree"
          label="Tree Directory"
          icon={<NaturePeopleOutlinedIcon />}
        />
        <BottomNavigationAction
          value="/app/service"
          label="Video Service"
          icon={<ForumOutlinedIcon />}
        />
      </BottomNavigation>
    </AppBar>
  )
}

export default LowerNavigation
