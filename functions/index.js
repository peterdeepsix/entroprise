const functions = require("firebase-functions")
const admin = require("firebase-admin")

const AccessToken = require("twilio").jwt.AccessToken
const VideoGrant = AccessToken.VideoGrant
const MAX_ALLOWED_SESSION_DURATION = 14400

admin.initializeApp()
const firestore = admin.firestore()

exports.onUserStatusChanged = functions.database
  .ref("/status/{uid}")
  .onUpdate((change, context) => {
    const eventStatus = change.after.val()
    const userStatusFirestoreRef = firestore.doc(`users/${context.params.uid}`)
    console.log(change, "change")
    console.log(context, "context")
    return change.after.ref.once("value").then(statusSnapshot => {
      const status = statusSnapshot.val()
      console.log(status, "status")
      if (status.last_changed > eventStatus.last_changed) {
        return null
      }
      eventStatus.last_changed = new Date(eventStatus.last_changed)
      const newStatus = {
        status: {
          last_changed: eventStatus.last_changed,
          state: eventStatus.state,
        },
      }
      console.log(newStatus, "newStatus")
      return userStatusFirestoreRef.set(newStatus, { merge: true })
    })
  })

exports.token = functions.https.onRequest((req, res) => {
  res.set("Access-Control-Allow-Origin", "*")
  res.set("Access-Control-Allow-Methods", "GET")
  res.set("Access-Control-Allow-Headers", "Content-Type")
  res.set("Access-Control-Max-Age", "3600")

  if (req.method == "OPTIONS") {
    res.status(204).send("")
  }

  const sendTokenResponse = (token, res) => {
    res.set("Content-Type", "application/json")
    res.send(
      JSON.stringify({
        token: token.toJwt(),
      })
    )
  }

  const generateToken = () => {
    return new AccessToken(
      functions.config().twilio.accountsid,
      functions.config().twilio.apikeysid,
      functions.config().twilio.apikeysecret,
      {
        ttl: MAX_ALLOWED_SESSION_DURATION,
      }
    )
  }

  const videoToken = (identity, room) => {
    let videoGrant
    if (typeof room !== "undefined") {
      videoGrant = new VideoGrant({ room })
    } else {
      videoGrant = new VideoGrant()
    }
    const token = generateToken()
    token.addGrant(videoGrant)
    token.identity = identity
    return token
  }

  const identity = req.body.identity
  const roomName = req.body.roomName
  const token = videoToken(identity, roomName)
  console.log(`issued token for ${identity} in room ${roomName}`)
  console.log(`token ${token}`)
  sendTokenResponse(token, res)
})
