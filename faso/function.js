const { default: next } = require("next");
const functions = require("firebase-functions");

const { https } = functions.region("asia-southeast2");

const isDev = process.env.NODE_ENV !== "production";
const server = next({
  dev: isDev,
  conf: { distDir: ".next" },
});

const nextjsHandle = server.getRequestHandler();
exports.nextServer = https.onRequest((req, res) => {
  return server.prepare().then(() => nextjsHandle(req, res));
});
