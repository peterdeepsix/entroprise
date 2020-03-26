import React from "react"
import MuiLink from "@material-ui/core/Link"
import AniLink from "gatsby-plugin-transition-link/AniLink"

const LinkComponent = React.forwardRef(function Link(props, ref) {
  return <MuiLink component={AniLink} ref={ref} {...props} />
})

export default LinkComponent
