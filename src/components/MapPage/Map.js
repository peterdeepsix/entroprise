import React, { useEffect, useRef } from "react"
import PropTypes from "prop-types"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

import { usePosition } from "use-position"

import { makeStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"

import { getCenterAndZoom } from "./util"
import StyleSelector from "./StyleSelector"

const mapboxToken = process.env.GATSBY_MAPBOX_API_TOKEN

const useStyles = makeStyles((theme) => ({
  root: {},
}))

// This wrapper must be positioned relative for the map to be able to lay itself out properly
const Wrapper = ({ width, height, children }) => (
  <div
    style={{
      position: "relative",
      flex: "1 0 auto",
      width: width,
      height: height,
    }}
  >
    {children}
  </div>
)

const Map = ({
  user,
  width,
  height,
  zoom,
  center,
  bounds,
  padding,
  styles,
  sources,
  layers,
  minZoom,
  maxZoom,
}) => {
  const { latitude, longitude, timestamp, accuracy, error } = usePosition(
    true,
    { enableHighAccuracy: true }
  )

  // this ref holds the map DOM node so that we can pass it into Mapbox GL
  const mapNode = useRef(null)

  // this ref holds the map object once we have instantiated it, so that we
  // can use it in other hooks
  const mapRef = useRef(null)

  // construct the map within an effect that has no dependencies
  // this allows us to construct it only once at the time the
  // component is constructed.
  useEffect(() => {
    let mapCenter = center
    let mapZoom = zoom

    // If bounds are available, use these to establish center and zoom when map first loads
    if (bounds && bounds.length === 4) {
      const { center: boundsCenter, zoom: boundsZoom } = getCenterAndZoom(
        mapNode.current,
        bounds,
        padding
      )
      mapCenter = boundsCenter
      mapZoom = boundsZoom
    }

    // Token must be set before constructing map
    mapboxgl.accessToken = mapboxToken

    const map = new mapboxgl.Map({
      container: mapNode.current,
      style: `mapbox://styles/mapbox/${styles[0]}`,
      center: mapCenter,
      zoom: mapZoom,
      minZoom,
      maxZoom,
    })
    mapRef.current = map
    window.map = map // for easier debugging and querying via console

    map.addControl(new mapboxgl.NavigationControl(), "top-right")

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    )

    if (styles.length > 1) {
      map.addControl(
        new StyleSelector({
          styles,
          token: mapboxToken,
        }),
        "bottom-left"
      )
    }

    map.on("load", () => {
      console.log("map onload")
      // add sources
      Object.entries(sources).forEach(([id, source]) => {
        map.addSource(id, source)
      })

      // add layers
      layers.forEach((layer) => {
        map.addLayer(layer)
      })
    })

    // hook up map events here, such as click, mouseenter, mouseleave
    // e.g., map.on('click', (e) => {})

    // when this component is destroyed, remove the map
    return () => {
      map.remove()
    }
  }, [])

  // You can use other `useEffect` hooks to update the state of the map
  // based on incoming props.  Just beware that you might need to add additional
  // refs to share objects or state between hooks.

  return (
    <>
      <Typography>Location Data: {user.displayName}</Typography>
      <Typography>Latitude: {latitude}</Typography>
      <Typography>Longitude: {longitude}</Typography>
      <Typography>Accuracy: {accuracy}</Typography>
      <Typography>Timestamp: {timestamp}</Typography>
      <Wrapper width={width} height={height}>
        <div ref={mapNode} style={{ width: "100%", height: "60vh" }} />
        {/* <StyleSelector map={mapRef.current} styles={styles} token={mapboxToken} /> */}
      </Wrapper>
    </>
  )
}

Map.defaultProps = {
  width: "auto",
  height: "100%",
  center: [0, 0],
  zoom: 0,
  bounds: null,
  minZoom: 0,
  maxZoom: 24,
  styles: ["light-v9", "dark-v9", "streets-v11"],
  padding: 0.1, // padding around bounds as a proportion
  sources: {},
  layers: [],
}

export default Map
