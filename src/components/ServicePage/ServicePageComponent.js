import React, { useEffect, useRef, useState } from "react"

import { makeStyles } from "@material-ui/core/styles"
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"

const useStyles = makeStyles(theme => ({
  root: {},
}))

const ServicePageComponent = () => {
  const classes = useStyles()

  return (
    <>
      <Box mt={2} mb={1}>
        <Card variant="outlined">
          <CardHeader title="Channels" />
          <CardContent>
            <Typography>asd</Typography>
          </CardContent>
        </Card>
      </Box>
      <Box mt={2} mb={1}>
        <Card variant="outlined">
          <CardHeader title="Users" />
          <CardContent>
            <Typography>asd</Typography>
          </CardContent>
        </Card>
      </Box>
      <Box mt={2} mb={1}>
        <Card variant="outlined">
          <CardHeader title="Messages" />
          <CardContent>
            <Typography>asd</Typography>
          </CardContent>
        </Card>
      </Box>
      <Box mt={2} mb={1}>
        <Card variant="outlined">
          <CardHeader title="Credentials" />
          <CardContent>
            <Typography>asd</Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}
export default ServicePageComponent
