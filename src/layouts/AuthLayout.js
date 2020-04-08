import React, { useEffect, useState, useMemo } from "react"
import firebase from "gatsby-plugin-firebase"

const AuthLayout = ({ children }) => {
  const auth = firebase.auth()
  const rtdb = firebase.database()
  const firestoreRef = firebase.firestore()
  const firestoreUsersRef = firestoreRef.collection("users")

  // RTDB online state
  const isOnlineForDatabase = {
    state: "online",
    last_changed: firebase.database.ServerValue.TIMESTAMP,
  }
  // Firestore online state
  const isOnlineForFirestore = {
    status: {
      state: "online",
      last_changed: firebase.firestore.FieldValue.serverTimestamp(),
    },
  }
  // RTDB offline state
  const isOfflineForDatabase = {
    state: "offline",
    last_changed: firebase.database.ServerValue.TIMESTAMP,
  }
  // Firestore offline state
  const isOfflineForFirestore = {
    status: {
      state: "offline",
      last_changed: firebase.firestore.FieldValue.serverTimestamp(),
    },
  }

  // Config auth persistence
  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)

  // listen for auth change
  auth.onAuthStateChanged((user) => {
    if (user) {
      const firestoreUserStatusRef = firestoreRef.doc(`users/${user.uid}/`)
      firestoreUserStatusRef
        .set(
          {
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            isAnonymous: user.isAnonymous,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            providerId: user.providerId,
            refreshToken: user.refreshToken,
            uid: user.uid,
            status: isOnlineForFirestore.status,
          },
          { merge: true }
        )
        .catch((error) => {
          console.log(error.code)
          console.log(error.message)
        })
    }
    if (!user) {
      firebase
        .auth()
        .signInAnonymously()
        .then((result) => {
          firestoreUsersRef.doc(result.user.uid).set(
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
            },
            { merge: true }
          )
        })
        .catch((error) => {
          console.log(error.code)
          console.log(error.message)
        })
    }
  })

  // listen for changes in RTDB active connections and update RTDB and Firestore
  rtdb.ref(".info/connected").on("value", (snapshot) => {
    // listen for disconnect to RTDB if user
    if (auth.currentUser) {
      const uid = auth.currentUser.uid
      const userStatusDatabaseRef = rtdb.ref("/status/" + uid)
      const userStatusFirestoreRef = firestoreRef.doc(`users/${uid}/`)

      // IF RTDB ".info/connected" is false then set Firestore to offline
      if (snapshot.val() === false) {
        userStatusFirestoreRef.set(isOfflineForFirestore, { merge: true })
        return
      }

      // when RTDB disconnects set RTDB reference to offline
      // then set Firestore and RTDB references to online upon reconnect
      userStatusDatabaseRef
        .onDisconnect()
        .set(isOfflineForDatabase)
        .then(() => {
          userStatusDatabaseRef.set(isOnlineForDatabase)
          userStatusFirestoreRef.set(isOnlineForFirestore, { merge: true })
        })
    }
  })

  return <>{children}</>
}

export default AuthLayout
