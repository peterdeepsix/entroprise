import React, { useState, useEffect } from "react"
import { withContext } from "react-dims"
import WebCola from "react-cola"
import { Line } from "react-lineto"
import { makeStyles } from "@material-ui/core/styles"
import { Box, Card, CardContent } from "@material-ui/core"

import Loadable from "@loadable/component"
import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const Chip = Loadable(() => import("./Chip"), {
  fallback: <IndefiniteLoading message="Chip" />,
})

const useStyles = makeStyles((theme) => ({}))

const Tree = ({ dims }) => {
  console.log("tree")
  console.log(dims)
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
                    zIndex: -2,
                    borderRadius: 16,
                    backgroundColor: "none",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      zIndex: -3,
                      borderWidth: 16,
                      borderColor: "rgba(0, 0, 0, .12)",
                      borderRadius: 16,
                      backgroundColor: "rgba(0, 0, 0, .12)",
                    }}
                  ></div>
                </div>
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
                  borderColor="#219a49"
                  zIndex={-1}
                />
              )
            })}
            {layout
              .nodes()
              .map(({ x, y, width, height, name, color, variant }, i) => (
                <div
                  style={{
                    position: "absolute",
                    left: x + 12 - width * 0.5,
                    top: y + 12 - height * 0.5,
                    width,
                    height,
                  }}
                >
                  <Chip key={i} color={color} variant={variant} name={name} />
                </div>
              ))}
          </>
        )}
        nodes={[
          {
            width: 150,
            height: 56,
            name: "Steve Addington",
            color: "primary",
          },
          {
            width: 150,
            height: 56,
            name: "Mike Nereson",
          },
          {
            width: 150,
            height: 56,
            name: "Peter Arnold",
            color: "primary",
          },
          {
            width: 150,
            height: 56,
            name: "Dave's #2",
            color: "primary",
          },
          {
            width: 150,
            height: 56,
            name: "Dave Arnold",
            color: "primary",
          },
          {
            width: 150,
            height: 56,
            name: "Andrew Nelligan",
          },
          {
            width: 150,
            height: 56,
            name: "John Arnold",
          },
        ]}
        links={[
          { source: 1, target: 2 },
          { source: 1, target: 4 },
          { source: 2, target: 3 },
          { source: 3, target: 4 },
          { source: 0, target: 1 },
          { source: 2, target: 0 },
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
