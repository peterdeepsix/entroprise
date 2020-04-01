import React, { useMemo } from "react"
import firebase from "gatsby-plugin-firebase"
import { useAuthState } from "react-firebase-hooks/auth"

const AuthLayout = ({ children }) => {
  const [user, loading, error] = useAuthState(firebase.auth())

  const auth = firebase.auth()
  const rtdb = firebase.database()
  const db = firebase.firestore()

  const usersRef = db.collection("users")

  useMemo(() => {
    if (user) {
      const uid = auth.currentUser.uid
      const userStatusDatabaseRef = rtdb.ref("/status/" + uid)

      const isOfflineForDatabase = {
        state: "offline",
        last_changed: firebase.database.ServerValue.TIMESTAMP,
      }

      const isOnlineForDatabase = {
        state: "online",
        last_changed: firebase.database.ServerValue.TIMESTAMP,
      }

      const userStatusFirestoreRef = db.doc(`users/${uid}/`)

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

      rtdb.ref(".info/connected").on("value", snapshot => {
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
  }, [user])

  useMemo(() => {
    if (!user) {
      firebase
        .auth()
        .signInAnonymously()
        .then(result => {
          usersRef.doc(result.user.uid).set(
            {
              displayName: result.user.displayName,
              email: result.user.email,
              emailVerified: result.user.emailVerified,
              isAnonymous: result.user.isAnonymous,
              phoneNumber: result.user.phoneNumber,
              photoURL: result.user.photoURL,
              providerId: result.user.providerId,
              refreshToken: result.user.refreshToken,
              uid: result.user.uid,
              online: true,
            },
            { merge: true }
          )
        })
        .catch(function(error) {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode)
          console.log(errorMessage)
        })
    }
  }, [user])

  usersRef
    .get()
    .then(snapshot => {
      if (snapshot.exists) {
        usersRef.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === "added") {
              var msg = "User " + change.doc.id + " is online."
            }

            if (change.type === "removed") {
              var msg = "User " + change.doc.id + " is offline."
            }
          })
        })
      } else {
        console.log("fs_listen_online, snapshot does not exist")
      }
    })
    .catch(function(err) {
      console.error("Error from fs_listen_online:")
      console.error(err)
    })

  return <>{children}</>
}

export default AuthLayout
