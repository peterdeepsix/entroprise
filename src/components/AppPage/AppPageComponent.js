import React from "react"

import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
} from "@material-ui/core"

const AppPageComponent = () => {
  return (
    <Container maxWidth="sm">
      <Box mt={2} mb={1}>
        <Card variant="outlined">
          <CardHeader title="Entroprise" />
          <CardContent>
            <Typography>Welcome to the application.</Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}
export default AppPageComponent
