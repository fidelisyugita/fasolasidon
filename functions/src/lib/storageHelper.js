const {isEmpty} = require("ramda");

const {FIREBASE_CONFIG, STORAGE_BASE_URL} = require("./config");
const {storageBucket} = require("./firebaseHelper");

exports.uploadBase64 = async (base64, pathName = "") => {
  const fileType = base64.match(/[^:/]\w+(?=;|,)/)[0];
  if (fileType && !isEmpty(fileType)) {
    const fileName = `${pathName}.${fileType}`;
    const file = storageBucket.file(fileName);

    // eslint-disable-next-line max-len
    const publicUrl = `${STORAGE_BASE_URL}${FIREBASE_CONFIG.storageBucket}/${fileName}`;
    this.remove(publicUrl);

    const encoded = base64.replace(/^data:\w+\/\w+;base64,/, "");
    const fileBuffer = Buffer.from(encoded, "base64");
    await file.save(fileBuffer, {public: true});

    return publicUrl;
  }

  return null;
};

exports.remove = async (imageUrl = "") => {
  if (imageUrl && !isEmpty(imageUrl)) {
    const fileName = imageUrl.replace(
        `${STORAGE_BASE_URL}${FIREBASE_CONFIG.storageBucket}/`,
        "",
    );
    const file = storageBucket.file(fileName);

    const fileExists = await file.exists();
    if (fileExists[0]) await file.delete();
  }
};
