import React, { useEffect } from "react"
import { navigate } from "gatsby"

import { makeStyles } from "@material-ui/core/styles"

import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core"

import { GiBubblingFlask } from "react-icons/gi"
import { AiOutlineRadarChart } from "react-icons/ai"
import { GiFamilyTree } from "react-icons/gi"

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
          value="/app"
          label="Application"
          icon={<GiBubblingFlask />}
        />
        <BottomNavigationAction
          value="/app/tree"
          label="Tree Graph"
          icon={<GiFamilyTree />}
        />
      </BottomNavigation>
    </AppBar>
  )
}

export default LowerNavigation
