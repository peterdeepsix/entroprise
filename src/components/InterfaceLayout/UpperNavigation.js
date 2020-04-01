import React from "react"
import { navigate } from "gatsby"

import { fade, makeStyles } from "@material-ui/core/styles"
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  AppBar,
  Toolbar,
  Drawer,
  useScrollTrigger,
  Slide,
  IconButton,
} from "@material-ui/core"
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined"
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined"

import LinkComponent from "src/components/LinkComponent/LinkComponent"

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: theme.palette.background.default,
  },
  toolbar: {},
  grow: {
    flexGrow: 1,
  },
  searchbutton: {
    width: 300,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    marginLeft: theme.spacing(1.5),
    marginRight: theme.spacing(1.5),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: 340,
    },
  },
  autoComplete: {
    // borderColor: theme.palette.text.primary,
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200,
      },
    },
  },
}))

function Scroll(props) {
  const { children } = props

  const trigger1 = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  const trigger2 = useScrollTrigger({})

  return (
    <Slide appear={false} direction="down" in={!trigger2}>
      {React.cloneElement(children, {
        elevation: trigger1 ? 4 : 0,
      })}
    </Slide>
  )
}

const UpperNavigation = ({ props }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <>
      <Scroll {...props}>
        <AppBar className={classes.appBar} positon="sticky" color="inherit">
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="search"
              onClick={handleClick}
            >
              <SearchOutlinedIcon />
            </IconButton>
            <div className={classes.grow} />
            <Typography
              onClick={() => navigate("/")}
              className={classes.title}
              variant="h6"
              color="textPrimary"
              noWrap
            >
              Entroprise
            </Typography>
            <div className={classes.grow} />
            <IconButton
              onClick={() => navigate("/app/account")}
              aria-label="delete"
              edge="end"
              color="inherit"
            >
              <AccountCircleOutlinedIcon />
            </IconButton>
          </Toolbar>
          <Drawer anchor="top" open={open} onClose={handleClose}>
            <Container maxWidth="sm">
              <Box mt={2} mb={1}>
                <Card variant="outlined">
                  <CardHeader title="Search" />
                  <CardContent>
                    <Typography>Implement someday.</Typography>
                  </CardContent>
                </Card>
              </Box>
            </Container>
          </Drawer>
        </AppBar>
      </Scroll>
      <Toolbar className={classes.toolbar}></Toolbar>
    </>
  )
}

export default UpperNavigation
