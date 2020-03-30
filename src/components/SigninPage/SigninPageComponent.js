import React from "react"
import Loadable from "@loadable/component"

import {
  Container,
  Box,
  Card,
  CardContent,
  CardHeader,
} from "@material-ui/core"

import IndefiniteLoading from "src/components/Loading/IndefiniteLoading"

const SignInGoogle = Loadable(() => import("./SignInGoogle"), {
  fallback: <IndefiniteLoading message="SignInGoogle" />,
})

const SigninPageComponent = () => {
  return (
    <Container maxWidth="sm">
      <Box mt={2} mb={1}>
        <Card variant="outlined">
          <CardHeader title="Sign In" />
          <CardContent>
            <SignInGoogle />
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}
export default SigninPageComponent
