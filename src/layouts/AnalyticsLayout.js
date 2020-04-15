import React, { useEffect, useState, useMemo } from "react"
import firebase from "gatsby-plugin-firebase"

const AnalyticsLayout = ({ children }) => {
  const [loot, setLoot] = useState(null)
  const analytics = firebase.analytics()

  return <>{children}</>
}

export default AnalyticsLayout
