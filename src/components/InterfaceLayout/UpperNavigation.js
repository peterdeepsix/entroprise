import React, { useState } from "react"
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
  Chip,
  Avatar,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  MenuItem,
} from "@material-ui/core"
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined"
import FaceOutlinedIcon from "@material-ui/icons/FaceOutlined"
import ArrowDropDownOutlined from "@material-ui/icons/ArrowDropDownOutlined"
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined"

import LinkComponent from "src/components/LinkComponent/LinkComponent"

const useStyles = makeStyles((theme) => ({
  chip: {
    color: theme.palette.text.primary,
    fontWeight: 500,
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    color: theme.palette.text.primary,
  },
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
  const [anchorEl, setAnchorEl] = useState(null)
  const [status, setStatus] = useState("Available")

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleChange = (event) => {
    setStatus(event.target.value)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    console.info("You clicked the delete icon.")
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
              onClick={() => navigate("/app/")}
            >
              <SearchOutlinedIcon />
            </IconButton>
            <div className={classes.grow} />
            <Chip
              className={classes.chip}
              avatar={
                <Avatar src="https://www.marinij.com/wp-content/uploads/2019/09/MIJ-L-HUFFMAN-0907-08.jpg?w=620" />
              }
              label={
                <FormControl className={classes.formControl}>
                  <Select
                    disableUnderline
                    id="select"
                    value={status}
                    onChange={handleChange}
                    renderValue={(selected) => (
                      <Typography variant="caption">{selected}</Typography>
                    )}
                  >
                    <MenuItem value={"Available"}>Available</MenuItem>
                    <MenuItem value={"Busy"}>Busy</MenuItem>
                    <MenuItem value={"Away From Keyboard"}>
                      Away From Keyboard
                    </MenuItem>
                    <MenuItem value={"Offline"}>Offline</MenuItem>
                  </Select>
                </FormControl>
              }
              clickable
              variant="outlined"
            />

            <div className={classes.grow} />
            {/* <IconButton
              color="inherit"
              aria-label="tensorflow"
              onClick={() => navigate("/app/tensorflow")}
            >
              <FaceOutlinedIcon />
            </IconButton> */}
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
