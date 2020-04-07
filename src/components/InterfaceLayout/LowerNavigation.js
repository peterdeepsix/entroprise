import React, { useEffect } from "react"
import { navigate } from "gatsby"

import { makeStyles } from "@material-ui/core/styles"

import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core"

import NaturePeopleOutlinedIcon from "@material-ui/icons/NaturePeopleOutlined"
import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined"
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
          value="/app/tree"
          label="Tree Directory"
          icon={<AccountTreeOutlinedIcon />}
        />
        <BottomNavigationAction
          value="/app/map"
          label="Map"
          icon={<NaturePeopleOutlinedIcon />}
        />

        <BottomNavigationAction
          value="/app/service"
          label="Communication"
          icon={<ForumOutlinedIcon />}
        />
      </BottomNavigation>
    </AppBar>
  )
}

export default LowerNavigation
