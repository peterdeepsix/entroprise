import React from "react"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import { Box, Card, CardHeader, CardContent } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const ThreadDetails = () => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <Box mt={3} mb={1}>
      <Card variant="outlined">
        <CardHeader title="Thread Name" />
        <CardContent>Hello Thread</CardContent>
      </Card>
    </Box>
  )
}

export default ThreadDetails
