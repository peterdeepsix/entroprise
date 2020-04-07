import React from "react"
import Loadable from "@loadable/component"

import { makeStyles } from "@material-ui/core/styles"
import { Box } from "@material-ui/core"

import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const Map = Loadable(() => import("./Map"), {
  fallback: <IndefiniteLoading message="Map" />,
})

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const sources = {
  oregon: {
    type: "geojson",
    data: {
      type: "Polygon",
      coordinates: [
        [
          [-124.03564453125, 46.195042108660154],
          [-124.5849609375, 42.89206418807337],
          [-124.365234375, 42.049292638686836],
          [-117.00439453125, 42.049292638686836],
          [-116.96044921875, 45.99696161820381],
          [-118.98193359375, 46.027481852486645],
          [-121.201171875, 45.66012730272194],
          [-122.32177734375, 45.61403741135093],
          [-122.76123046875, 45.644768217751924],
          [-122.98095703125, 46.195042108660154],
          [-123.6181640625, 46.240651955001695],
          [-124.03564453125, 46.195042108660154],
        ],
      ],
    },
  },
}

const layers = [
  {
    id: "1",
    source: "oregon",
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
