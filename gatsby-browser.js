import "firebase/auth"
import "firebase/database"
import "firebase/firestore"
import "firebase/storage"
import "firebase/messaging"
import "firebase/functions"
import "firebase/performance"
import "firebase/analytics"
import "firebase/remote-config"

import LogRocket from "logrocket"

import RootProvider from "src/providers/RootProvider"

export const onClientEntry = () => {
  LogRocket.init("6frqmr/entroprise")
}

require("typeface-muli")

export const wrapRootElement = RootProvider
