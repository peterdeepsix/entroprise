import React from "react"
import Loadable from "@loadable/component"
import { BigCalendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"

import { makeStyles } from "@material-ui/core/styles"
import { Box } from "@material-ui/core"

import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const useStyles = makeStyles((theme) => ({}))

const localizer = momentLocalizer(moment)

const TimelinePageComponent = ({ user }) => {
  const classes = useStyles()

  return (
    <Box mt={2} mb={10}>
      {/* <BigCalendar
        style={{ height: "420px" }}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
      /> */}
    </Box>
  )
}
export default TimelinePageComponent
