import { useContext, createContext } from "react"
import { types, Instance, onSnapshot } from "mobx-state-tree"

import { Features } from "./Features"
import { Theme } from "./Theme"

const RootModel = types.model({
  Features,
  Theme,
})

export const rootStore = RootModel.create({
  remoteConfig: {
    featureThread: types.boolean,
  },
  theme: {
    themeObject: {
      palette: {
        primary: {
          main: "#219a49",
        },
        secondary: {
          main: "#246EB9",
        },
        error: {
          main: "#F06543",
        },
      },
      typography: {
        button: {
          textTransform: "none",
        },
        overline: {
          textTransform: "none",
        },
        fontFamily: [
          "Muli",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(","),
      },
    },
  },
})

onSnapshot(rootStore, (snapshot) => console.log("Snapshot: ", snapshot))

const RootStoreContext = createContext(null)

export const Provider = RootStoreContext.Provider
export function useMst() {
  const store = useContext(RootStoreContext)
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider")
  }
  return store
}
