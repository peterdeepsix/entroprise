import React, { useState, useEffect } from "react"
import { withContext } from "react-dims"
import WebCola from "react-cola"
import { Line } from "react-lineto"
import { makeStyles } from "@material-ui/core/styles"
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

const Tree = ({ dims }) => {
  const classes = useStyles()
  const nodeHeight = 32
  const nodeWidth = 144
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
                    backgroundColor: "orange",
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
                  borderColor="blue"
                  zIndex={0}
                />
              )
            })}
            {layout.nodes().map(({ x, y, width, height, name }, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: x - width * 0.5,
                  top: y - height * 0.5,
                  width,
                  height,
                  backgroundColor: "red",
                  borderRadius: 16,
                }}
              >
                {name}
              </div>
            ))}
          </>
        )}
        nodes={[
          {
            width: nodeWidth,
            height: nodeHeight,
            name: "displayName",
          },
          {
            width: nodeWidth,
            height: nodeHeight,
            name: "displayName",
          },
          {
            width: nodeWidth,
            height: nodeHeight,
            name: "displayName",
          },
          {
            width: nodeWidth,
            height: nodeHeight,
            name: "displayName",
          },
          {
            width: nodeWidth,
            height: nodeHeight,
            name: "displayName",
          },
          {
            width: nodeWidth,
            height: nodeHeight,
            name: "displayName",
          },
          {
            width: nodeWidth,
            height: nodeHeight,
            name: "displayName",
          },
        ]}
        links={[
          { source: 1, target: 2 },
          { source: 2, target: 3 },
          { source: 3, target: 4 },
          { source: 0, target: 1 },
          { source: 2, target: 0 },
          { source: 3, target: 5 },
          { source: 0, target: 5 },
        ]}
        groups={[
          { leaves: [0], groups: [1] },
          { leaves: [1, 2] },
          { leaves: [3, 4] },
        ]}
        width={dims.width}
        height={dims.height}
      />
    </>
  )
}

export default withContext(Tree)
