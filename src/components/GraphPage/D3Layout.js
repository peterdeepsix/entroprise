import React, { useState, useEffect } from "react"
import "./D3Layout.css"
import { Provider } from "react-dims"
import { shuffle } from "d3-array"

import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CardActionArea,
} from "@material-ui/core"

import D3App from "./D3App"

const D3Layout = () => {
  const [players, setPlayers] = useState([])
  const [cut, setCut] = useState([])

  const rand = (min, max) => {
    return min + Math.round(Math.random() * max)
  }

  const createPlayer = id => {
    return {
      id: id,
      ego: rand(5, 10),
      x: rand(2, 98),
      y: rand(2, 48),
    }
  }

  const updatePlayers = () => {
    if (players.length === 11) {
      setCut(players.splice(rand(1, 5), rand(1, 5)))
    } else {
      cut.forEach(p => players.push(p))
    }
    let temp = players.map(d => createPlayer(d.id))
    shuffle(temp)
    setPlayers(temp)
  }

  useEffect(() => {
    let init = []
    for (let i = 0; i < 11; i++) {
      init.push(createPlayer(i + 1))
    }
    setPlayers(init)
  }, [])

  return (
    <div className="myLayout">
      <div
        style={{
          gridArea: "1/2/2/4",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button color="primary" variant="outlined" onClick={updatePlayers}>
          Update Users
        </Button>
      </div>
      <div className="coolThing">
        <Provider>
          <D3App data={players} />
        </Provider>
      </div>
    </div>
  )
}

export default D3Layout
