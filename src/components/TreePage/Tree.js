import React, { useState, useEffect } from "react"
import { withContext } from "react-dims"
import WebCola from "react-cola"
import { Line } from "react-lineto"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import { Typography, Card, CardHeader } from "@material-ui/core"

import Loadable from "@loadable/component"
import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const Chip = Loadable(() => import("./Chip"), {
  fallback: <IndefiniteLoading message="Chip" />,
})

const useStyles = makeStyles((theme) => ({
  caption: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}))

const Tree = ({ dims, usersDocs }) => {
  const classes = useStyles()
  const theme = useTheme()
  const nodeHeight = 32
  const nodeWidth = 144

  let usersNodesData = [
    {
      width: 60,
      height: 40,
      name: "a",
    },
    {
      width: 60,
      height: 40,
      name: "b",
    },
  ]

  let newUsersNodesData = []

  usersDocs.forEach((doc) => {
    const data = doc.data()
    const tempData = {
      width: nodeWidth,
      height: nodeHeight,
      displayName: data.displayName,
      uid: data.uid,
    }
    newUsersNodesData.push(tempData)
  })

  console.log(usersNodesData)
  console.log(newUsersNodesData)

  return (
    <>
      <WebCola
        renderLayout={(layout) => (
          <>
            {layout.groups().map(({ bounds: { x, X, y, Y } }, i) => {
              const width = X - x
              const height = Y - y
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: x,
                    top: y,
                    width,
                    height,
                    backgroundColor: theme.palette.grey[400],
                    borderRadius: 16,
                    zIndex: -2,
                  }}
                />
              )
            })}
            {layout.links().map(({ source, target }, i) => {
              const { x, y } = source
              const { x: x2, y: y2 } = target
              return (
                <Line
                  key={i}
                  x0={x}
                  y0={y}
                  x1={x2}
                  y1={y2}
                  borderColor={theme.palette.divider}
                  zIndex={0}
                />
              )
            })}
            {layout.nodes().map(({ x, y, width, height, displayName }, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: x - width * 0.5,
                  top: y - height * 0.5,
                  width,
                  height,
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 16,
                }}
              >
                <Chip name={displayName} />
              </div>
            ))}
          </>
        )}
        nodes={newUsersNodesData}
        links={[]}
        groups={[]}
        width={dims.width}
        height={dims.height}
      />
    </>
  )
}

export default withContext(Tree)
