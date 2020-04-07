import React from "react"
import Loadable from "@loadable/component"

import { makeStyles } from "@material-ui/core/styles"
import { Box } from "@material-ui/core"

import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const Map = Loadable(() => import("./Map"), {
  fallback: <IndefiniteLoading message="Map" />,
})

const useStyles = makeStyles((theme) => ({}))

const sources = {
  henniker: {
    type: "geojson",
    data: {
      type: "Polygon",
      coordinates: [
        [
          [-71.84435248374938, 43.16606167886483],
          [-71.84356927871704, 43.16606167886483],
          [-71.84356927871704, 43.1666407508264],
          [-71.84435248374938, 43.1666407508264],
          [-71.84435248374938, 43.16606167886483],
        ],
      ],
    },
  },
}

const layers = [
  {
    id: "1",
    source: "henniker",
    type: "fill",
    paint: {
      "fill-color": "red",
      "fill-opacity": 0.5,
    },
  },
]

const ServicePageComponent = ({ user }) => {
  const classes = useStyles()

  return (
    <Box mt={2} mb={10}>
      <Map user={user} sources={sources} layers={layers} />
    </Box>
  )
}
export default ServicePageComponent
