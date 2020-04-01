import React, { useMemo } from "react"
import firebase from "gatsby-plugin-firebase"
import { useAuthState } from "react-firebase-hooks/auth"

const AuthLayout = ({ children }) => {
  const [user, loading, error] = useAuthState(firebase.auth())

  const db = firebase.firestore()

  const usersRef = db.collection("users")

  useMemo(() => {
    if (!user) {
      firebase
        .auth()
        .signInAnonymously()
        .then(result => {
          usersRef.doc(result.user.uid).set(
            {
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

  return <>{children}</>
}

export default AuthLayout
