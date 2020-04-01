import React, { useEffect } from "react"
import { navigate } from "gatsby"

import { makeStyles } from "@material-ui/core/styles"

import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core"

import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined"
import NaturePeopleOutlinedIcon from "@material-ui/icons/NaturePeopleOutlined"

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
          value="/app/users"
          label="User List"
          icon={<PeopleAltOutlinedIcon />}
        />
        <BottomNavigationAction
          value="/app/tree"
          label="Tree Graph"
          icon={<NaturePeopleOutlinedIcon />}
        />
      </BottomNavigation>
    </AppBar>
  )
}

export default LowerNavigation
