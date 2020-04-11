import React, { useRef } from "react"
import Loadable from "@loadable/component"
import firebase from "gatsby-plugin-firebase"
import { useCollection } from "react-firebase-hooks/firestore"
import {
  SnapList,
  SnapItem,
  useVisibleElements,
  useScroll,
  useDragToScroll,
  isTouchDevice,
} from "react-snaplist-carousel"

import { Box } from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"

import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const Channel = Loadable(() => import("./Channel"), {
  fallback: <IndefiniteLoading message="Channel" />,
})

const useStyles = makeStyles((theme) => ({
  root: {
    // width: "100%",
  },
  box: { width: 370 },
  item: {
    // height: 1000,
    // width: "100%",
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
  },
}))

const MyItem = ({ onClick, children, visible }) => (
  <div
    style={{
      // width: "80vw",
      cursor: visible ? "default" : "pointer",
    }}
    onClick={onClick}
  >
    {children}
  </div>
)

const Channels = ({ user }) => {
  const classes = useStyles()
  const snapList = useRef(null)

  const visible = useVisibleElements(
    { debounce: 10, ref: snapList },
    ([element]) => element
  )
  const goToSnapItem = useScroll({ ref: snapList })
  const isDragging = useDragToScroll({ ref: snapList })

  return (
    <>
      <SnapList ref={snapList} direction="horizontal">
        <SnapItem snapAlign="center">
          <MyItem
            className={classes.item}
            onClick={() => goToSnapItem(0)}
            visible={visible === 0}
          >
            <Box pl={2} pr={2} className={classes.box}>
              <Channel user={user} />
            </Box>
          </MyItem>
        </SnapItem>
        <SnapItem snapAlign="center">
          <MyItem onClick={() => goToSnapItem(1)} visible={visible === 1}>
            <Box pr={2} className={classes.box}>
              <Channel user={user} />
            </Box>
          </MyItem>
        </SnapItem>
        <SnapItem snapAlign="center">
          <MyItem onClick={() => goToSnapItem(2)} visible={visible === 2}>
            <Box pr={2} className={classes.box}>
              <Channel user={user} />
            </Box>
          </MyItem>
        </SnapItem>
        <SnapItem snapAlign="center">
          <MyItem onClick={() => goToSnapItem(3)} visible={visible === 3}>
            <Box pr={2} className={classes.box}>
              <Channel user={user} />
            </Box>
          </MyItem>
        </SnapItem>
        <SnapItem snapAlign="center">
          <MyItem onClick={() => goToSnapItem(4)} visible={visible === 4}>
            <Box pr={2} className={classes.box}>
              <Channel user={user} />
            </Box>
          </MyItem>
        </SnapItem>
        <SnapItem snapAlign="center">
          <MyItem onClick={() => goToSnapItem(1)} visible={visible === 1}>
            <Box pr={2} className={classes.box}>
              <Channel user={user} />
            </Box>
          </MyItem>
        </SnapItem>
        <SnapItem snapAlign="center">
          <MyItem onClick={() => goToSnapItem(2)} visible={visible === 2}>
            <Box pr={2} className={classes.box}>
              <Channel user={user} />
            </Box>
          </MyItem>
        </SnapItem>
        <SnapItem snapAlign="center">
          <MyItem onClick={() => goToSnapItem(3)} visible={visible === 3}>
            <Box pr={2} className={classes.box}>
              <Channel user={user} />
            </Box>
          </MyItem>
        </SnapItem>
        <SnapItem snapAlign="center">
          <MyItem onClick={() => goToSnapItem(4)} visible={visible === 4}>
            <Box pr={2} className={classes.box}>
              <Channel user={user} />
            </Box>
          </MyItem>
        </SnapItem>
      </SnapList>
    </>
  )
}
export default Channels
