/* eslint-disable max-len */
const {logger} = require("firebase-functions");
const {isEmpty, isNil} = require("ramda");

const {ERROR_MESSAGE} = require("./lib/config");
const {authenticate} = require("./lib/authHelper");
const {https} = require("./lib/firebaseHelper");
const {uploadBase64} = require("./lib/storageHelper");

const express = require("express");
const app = express();
app.use(authenticate);

// const SIZE_LIMIT = 1 * 1024 * 1024; // 1MB

// const multer = require("multer");
// const upload = multer({
//   dest: `${STORAGE_BASE_URL}${FIREBASE_CONFIG.storageBucket}/tmp/`,
//   limits: {
//     fileSize: SIZE_LIMIT,
//   },
// });
// const storage = multer.memoryStorage();
// const upload = multer({
//   storage: storage,
//   startProcessing(req, busboy) {
//     if (req.rawBody) {
//       // indicates the request was pre-processed
//       busboy.end(req.rawBody);
//     } else {
//       req.pipe(busboy);
//     }
//   },
//   limits: {
//     fileSize: SIZE_LIMIT,
//   },
// });

// app.post("/generate", upload.single("excel"), async (req, res) => {
//   // req.file is the `excel` file
//   // req.body will hold the text fields, if there were any
//   logger.info("req.file: ", JSON.stringify(req.file));

//   try {
//     return res.status(200).json(req.body);
//   } catch (error) {
//     logger.error(error.message);
//     return res.status(500).json(error);
//   }
// });

app.post("/generate", async (req, res) => {
  try {
    const {excelBase64} = req.body;
    if (isNil(excelBase64) || isEmpty(excelBase64)) {
      return res.status(405).json(ERROR_MESSAGE.invalidInput);
    }

    logger.log("START UPLOAD EXCEL");
    const data = {};
    const publicUrl = await uploadBase64(excelBase64, `tmp/${new Date().getTime()}`);
    if (publicUrl) data.excelUrl = publicUrl;

    return res.status(200).json(data);
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json(error);
  }
});

module.exports = https.onRequest(app);
