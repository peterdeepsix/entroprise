import React from "react"
import MuiLink from "@material-ui/core/Link"
import { Link } from "gatsby"

const LinkComponent = props => {
  return <MuiLink component={Link} {...props} />
}

export default LinkComponent
