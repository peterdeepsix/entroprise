import React, { useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import BottomNavigation from "@material-ui/core/BottomNavigation"
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction"
import AppBar from "@material-ui/core/AppBar"
import { TiThListOutline } from "react-icons/ti"
import { AiOutlineRadarChart } from "react-icons/ai"
import { FiMapPin } from "react-icons/fi"

import LinkComponent from "src/components/LinkComponent/LinkComponent"

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

  return (
    <AppBar
      position="fixed"
      color="primary"
      className={classes.stickToBottom}
      elevation={4}
    >
      <BottomNavigation
        value={value}
        aria-label="BottomNavigation label"
        showLabels
      >
        <BottomNavigationAction
          to="/"
          component={LinkComponent}
          fade
          duration={0.5}
          bg="#fff"
          value="/"
          label="List"
          icon={<TiThListOutline />}
        />
        <BottomNavigationAction
          to="/"
          component={LinkComponent}
          cover
          duration={0.5}
          bg="#fff"
          value="/graph"
          label="Graph"
          icon={<AiOutlineRadarChart />}
        />
        <BottomNavigationAction
          to="/"
          component={LinkComponent}
          paintDrip
          duration={0.5}
          hex="#fff"
          value="/map"
          label="Map"
          icon={<FiMapPin />}
        />
      </BottomNavigation>
    </AppBar>
  )
}

export default LowerNavigation
