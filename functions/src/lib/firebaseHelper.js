const functions = require("firebase-functions");
const {REGION, FIREBASE_CONFIG} = require("./config");

const firebase = require("firebase/app");
firebase.initializeApp(FIREBASE_CONFIG);

const fauth = require("firebase/auth");

const admin = require("firebase-admin");
if (!admin.apps.length) admin.initializeApp();

const runtimeOpts = {
  timeoutSeconds: 30,
  memory: "512MB",
};
const {https, auth} = functions.region(REGION).runWith(runtimeOpts);
// const {firestore, storage} = admin;
// const {arrayUnion, arrayRemove, serverTimestamp, increment} =
//   firestore.FieldValue;

// const storageBucket = storage().bucket(FIREBASE_CONFIG.storageBucket);

// const db = firestore();
// db.settings({ignoreUndefinedProperties: true});

// // MASTER START
// const configDoc = db.collection("master").doc("config");
// // MASTER END

// const usersCollection = db.collection("users");

module.exports = {
  https,
  authFunctions: auth,

  // storageBucket,

  // arrayUnion,
  // arrayRemove,
  // serverTimestamp,
  // increment,

  // configDoc,

  // usersCollection,

  fauth,
};
