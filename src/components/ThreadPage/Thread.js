import React, { useState, useEffect } from "react"
import { withContext } from "react-dims"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import { Typography, Card, CardHeader } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  caption: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}))

const Thead = ({ dims, usersDocs }) => {
  const classes = useStyles()
  const theme = useTheme()
  const nodeHeight = 48
  const nodeWidth = 144

  let usersNodesData = []
  let usersLinksData = []

  usersDocs.forEach((doc) => {
    const data = doc.data()
    const tempData = {
      width: nodeWidth,
      height: nodeHeight,
      displayName: data.displayName,
      uid: data.uid,
      status: data.status,
      linkedUsers: data.linkedUsers,
    }
    usersNodesData.push(tempData)
  })

  usersNodesData.forEach((userNode) => {
    if (userNode.linkedUsers)
      userNode.linkedUsers.forEach((linkedUser) => {
        const source = usersNodesData.map((el) => el.uid).indexOf(userNode.uid)
        const target = usersNodesData.map((el) => el.uid).indexOf(linkedUser)
        const tempLink = {
          source: source,
          target: target,
        }
        usersLinksData.push(tempLink)
      })
  })

  return <>asd</>
}

export default withContext(Thead)
