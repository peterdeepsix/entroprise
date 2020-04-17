const functions = require("firebase-functions")
const admin = require("firebase-admin")

const AccessToken = require("twilio").jwt.AccessToken
const VideoGrant = AccessToken.VideoGrant
const ChatGrant = AccessToken.ChatGrant
const MAX_ALLOWED_SESSION_DURATION = 14400
const FIRESTORE_TOKEN_COLLECTION = "instance_tokens"

admin.initializeApp()
const firestore = admin.firestore()
const messaging = admin.messaging()

function buildCommonMessage(title, body) {
  console.log("buildCommonMessage")
  return {
    notification: {
      title: title,
      body: body,
    },
  }
}

function buildPlatformMessage(topic, title, body, link) {
  console.log("buildPlatformMessage")
  const fcmMessage = buildCommonMessage(title, body)

  const webpush = {
    headers: {
      TTL: "0",
    },
    notification: {
      icon: "https://cdn.britannica.com/32/122932-050-43EE55D3/Elk.jpg",
    },
    fcm_options: {
      link: link,
    },
  }

  fcmMessage["topic"] = topic
  fcmMessage["webpush"] = webpush
  return fcmMessage
}

async function sendFcmMessage(fcmMessage) {
  console.log("sendFcmMessage")
  try {
    await messaging.send(fcmMessage)
  } catch (err) {
    console.log(err)
  }
}

exports.onUserStatusChanged = functions.database
  .ref("/status/{uid}")
  .onUpdate((change, context) => {
    const eventStatus = change.after.val()
    const userStatusFirestoreRef = firestore.doc(`users/${context.params.uid}`)
    console.log(change, "change")
    console.log(context, "context")
    return change.after.ref.once("value").then((statusSnapshot) => {
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

  const message = buildPlatformMessage(
    "test",
    `Video Call: ${identity}`,
    `Room Name: ${roomName}`,
    `/app/thread/${roomName}`
  )
  console.log(`message ${message}`)
  sendFcmMessage(message)
  console.log(`issued token for identify:${identity} in roomName:${roomName}`)
  console.log(`token ${token}`)
  sendTokenResponse(token, res)
})

exports.chat = functions.https.onRequest((req, res) => {
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

  const chatToken = (identity) => {
    const chatGrant = new ChatGrant({
      serviceSid: identity,
    })
    const token = generateToken()
    token.addGrant(chatGrant)
    token.identity = identity
    return token
  }

  const identity = req.body.identity
  const token = chatToken(identity)
  console.log(`issued token for ${identity}`)
  console.log(`token ${token}`)
  sendTokenResponse(token, res)
})

exports.storetoken = functions.https.onRequest(async (req, res) => {
  console.log(`storetoken`)
  async function storeAppInstanceToken(token) {
    console.log("storeAppInstanceToken")
    try {
      return await firestore
        .collection(FIRESTORE_TOKEN_COLLECTION)
        .add({ token, createdAt: admin.firestore.FieldValue.serverTimestamp() })
    } catch (err) {
      console.log(`Error storing token [${token}] in firestore`, err)
      return null
    }
  }

  res.set("Access-Control-Allow-Origin", "*")
  res.set("Access-Control-Allow-Methods", "GET")
  res.set("Access-Control-Allow-Headers", "Content-Type")
  res.set("Access-Control-Max-Age", "3600")

  if (req.method == "OPTIONS") {
    res.status(204).send("")
  }

  if (!req.body) res.sendStatus(400)

  if (req.body.token) {
    result = await storeAppInstanceToken(req.body.token)
    result ? res.sendStatus(200) : res.sendStatus(500)
  } else {
    res.sendStatus(400)
  }
})

exports.subscribe = functions.https.onRequest(async (req, res) => {
  console.log(`subscribe`)
  async function subscribeAppInstanceToTopic(token, topic) {
    console.log("subscribeAppInstanceToTopic")
    try {
      return await messaging.subscribeToTopic(token, topic)
    } catch (err) {
      console.log(`Error subscribing token [${token}] to topic: `, err)
      return null
    }
  }

  res.set("Access-Control-Allow-Origin", "*")
  res.set("Access-Control-Allow-Methods", "GET")
  res.set("Access-Control-Allow-Headers", "Content-Type")
  res.set("Access-Control-Max-Age", "3600")

  if (req.method == "OPTIONS") {
    res.status(204).send("")
  }

  if (!req.body) res.sendStatus(400)

  if (req.body.token) {
    result = await subscribeAppInstanceToTopic(req.body.token, req.body.topic)
    result ? res.sendStatus(200) : res.sendStatus(500)
  } else {
    res.sendStatus(400)
  }
})

exports.unsubscribe = functions.https.onRequest(async (req, res) => {
  console.log(`unsubscribe`)
  async function unsubscribeAppInstanceFromTopic(token, topic) {
    console.log("unsubscribeFromTopic")
    try {
      return await messaging.unsubscribeFromTopic(token, topic)
    } catch (err) {
      console.log(`Error unsubscribing token [${token}] from topic: `, err)
      return null
    }
  }

  res.set("Access-Control-Allow-Origin", "*")
  res.set("Access-Control-Allow-Methods", "GET")
  res.set("Access-Control-Allow-Headers", "Content-Type")
  res.set("Access-Control-Max-Age", "3600")

  if (req.method == "OPTIONS") {
    res.status(204).send("")
  }

  if (!req.body) res.sendStatus(400)

  if (req.body.token) {
    result = await unsubscribeAppInstanceFromTopic(
      req.body.token,
      req.body.topic
    )
    result ? res.sendStatus(200) : res.sendStatus(500)
  } else {
    res.sendStatus(400)
  }
})

exports.deletetoken = functions.https.onRequest(async (req, res) => {
  console.log(`deletetoken`)

  async function deleteAppInstanceToken(token) {
    console.log("deleteAppInstanceToken")
    try {
      const deleteQuery = firestore
        .collection(FIRESTORE_TOKEN_COLLECTION)
        .where("token", "==", token)
      const querySnapshot = await deleteQuery.get()
      querySnapshot.docs.forEach(async (doc) => {
        await doc.ref.delete()
      })
      return true
    } catch (err) {
      console.log(`Error deleting token [${token}] in firestore`, err)
      return null
    }
  }

  res.set("Access-Control-Allow-Origin", "*")
  res.set("Access-Control-Allow-Methods", "DELETE")
  res.set("Access-Control-Allow-Headers", "Content-Type")
  res.set("Access-Control-Max-Age", "3600")

  if (req.method == "OPTIONS") {
    res.status(204).send("")
  }

  if (!req.body) res.sendStatus(400)

  if (req.body.token) {
    result = await deleteAppInstanceToken(req.body.token)
    result ? res.sendStatus(204) : res.sendStatus(500)
  } else {
    res.sendStatus(400)
  }
})
