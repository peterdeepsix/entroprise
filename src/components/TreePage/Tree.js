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
  const nodeHeight = 48
  const nodeWidth = 144

  let usersNodesData = []
  let usersLinksData = []

  usersDocs.forEach((doc) => {
    const data = doc.data()
    const tempData = {
      width: nodeWidth,
      height: nodeHeight,
      displayName: data.displayName,
      uid: data.uid,
      status: data.status,
      linkedUsers: data.linkedUsers,
    }
    usersNodesData.push(tempData)
  })

  usersNodesData.forEach((userNode) => {
    if (userNode.linkedUsers)
      userNode.linkedUsers.forEach((linkedUser) => {
        const source = usersNodesData.map((el) => el.uid).indexOf(userNode.uid)
        const target = usersNodesData.map((el) => el.uid).indexOf(linkedUser)
        const tempLink = {
          source: source,
          target: target,
        }
        usersLinksData.push(tempLink)
      })
  })

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
                    backgroundColor: theme.palette.divider,
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
                  borderColor={theme.palette.primary.main}
                  zIndex={-1}
                />
              )
            })}
            {layout
              .nodes()
              .map(({ x, y, width, height, displayName, status }, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: x - width * 0.5,
                    top: y - height * 0.5,
                    width,
                    height,
                    borderRadius: 16,
                  }}
                >
                  <Chip status={status} name={displayName} />
                </div>
              ))}
          </>
        )}
        nodes={usersNodesData}
        links={usersLinksData}
        // groups={[{ leaves: [0, 1] }, { leaves: [0, 3] }]}
        width={dims.width}
        height={dims.height}
      />
    </>
  )
}

export default withContext(Tree)
