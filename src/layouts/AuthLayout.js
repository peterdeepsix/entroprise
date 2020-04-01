import React, { useMemo } from "react"
import firebase from "gatsby-plugin-firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useList } from "react-firebase-hooks/database"

const AuthLayout = ({ children }) => {
  const [user, loading, error] = useAuthState(firebase.auth())

  if (firebase.auth.currentUser) {
    const uid = firebase.auth.currentUser.uid

    const userStatusDatabaseRef = firebase.database.ref("/status/" + uid)

    const isOfflineForDatabase = {
      state: "offline",
      last_changed: firebase.database.ServerValue.TIMESTAMP,
    }

    const isOnlineForDatabase = {
      state: "online",
      last_changed: firebase.database.ServerValue.TIMESTAMP,
    }

    const userStatusFirestoreRef = firebase.firestore.doc(`users/${uid}/`)

    const isOfflineForFirestore = {
      status: {
        state: "offline",
        last_changed: firebase.firestore.FieldValue.serverTimestamp(),
      },
    }

    const isOnlineForFirestore = {
      status: {
        state: "online",
        last_changed: firebase.firestore.FieldValue.serverTimestamp(),
      },
    }

    firebase.database.ref(".info/connected").on("value", function(snapshot) {
      if (snapshot.val() === false) {
        console.log("user is offline")
        userStatusFirestoreRef.set(isOfflineForFirestore, { merge: true })
        return
      }

      userStatusDatabaseRef
        .onDisconnect()
        .set(isOfflineForDatabase)
        .then(function() {
          userStatusDatabaseRef.set(isOnlineForDatabase)

          userStatusFirestoreRef.set(isOnlineForFirestore, { merge: true })
        })
    })
  }

  useMemo(() => {
    if (!user) {
      firebase
        .auth()
        .signInAnonymously()
        .catch(function(error) {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode)
          console.log(errorMessage)
        })
    }
  }, [user])

  return <>{children}</>
}

export default AuthLayout
