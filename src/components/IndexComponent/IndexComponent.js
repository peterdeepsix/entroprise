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
} from "@material-ui/core"

const IndexComponent = () => {
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
      <Box mt={2} mb={1}>
        <Card variant="outlined">
          <Box mx={8} my={3}>
            <Img fluid={data.placeholderImage.childImageSharp.fluid} />
          </Box>
        </Card>
      </Box>
      <Box mt={2} mb={1}>
        <Card variant="outlined">
          <CardHeader title="Entroprise" subheader="" />
          <CardContent>
            <Typography variant="body1">Realtime Workforce Presence</Typography>
          </CardContent>
        </Card>
      </Box>
      <Box mt={2} mb={1}>
        <Card variant="outlined">
          <CardHeader title="Strategy" />
          <CardContent>
            <Typography>
              Taking out of scope problems beyond completion.
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box mt={2} mb={1}>
        <Card variant="outlined">
          <CardHeader title="Timeline" />
          <CardContent>
            <Typography>When the enterprise hits the fan.</Typography>
          </CardContent>
        </Card>
      </Box>
      <Box mt={2} mb={10}>
        <Card variant="outlined">
          <CardHeader title=" Prior Art" />
          <CardContent>
            <Typography>
              In mainstream theories of natural language syntax, every
              syntactically-valid utterance can be extended to produce a new,
              longer one, because of recursion. If this process can be continued
              indefinitely, then there is no upper bound on the length of a
              well-formed utterance and the number of unique well-formed strings
              of any language is countably infinite. However, the books in the
              Library of Babel are of bounded--**/ length ("each book is of four
              hundred and ten pages; each page, of forty lines, each line, of
              some eighty letters"), so the Library can only contain a finite
              number of distinct strings, and thus cannot contain all possible
              well-formed utterances. Borges' narrator notes this fact, but
              believes that the Library is nevertheless infinite; he speculates
              that it repeats itself periodically, giving an eventual "order" to
              the "disorder" of the seemingly-random arrangement of books.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}

export default IndexComponent
