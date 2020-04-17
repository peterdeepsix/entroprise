import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
} from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"
const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}))

const AppPageComponent = () => {
  const classes = useStyles()

  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Container maxWidth="sm">
      <Box mt={2} mb={10}>
        <Card variant="outlined">
          <Box mx={8} my={3}>
            <Img fluid={data.placeholderImage.childImageSharp.fluid} />
          </Box>
        </Card>
      </Box>
    </Container>
  )
}
export default AppPageComponent
