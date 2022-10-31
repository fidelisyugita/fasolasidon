
const {logger} = require("firebase-functions");
const Excel = require("exceljs");

exports.modify = async (base64) => {
  const workbook = new Excel.Workbook();

  const encoded = base64.replace(/^data:\w+\/\w+;base64,/, "");
  const fileBuffer = Buffer.from(encoded, "base64");

  try {
    await workbook.xlsx.load(fileBuffer);
    const worksheet = workbook.worksheets[0];
    worksheet.deleteColumnKey("A");
    const row = worksheet.getRow(5);
    row.getCell(1).value = 5; // A5's value set to 5
    row.commit();
    return workbook.xlsx.writeBuffer();
  } catch (error) {
    logger.error(error.message);
  }
};

exports.modifyPath = async (filePath, newFilePath) => {
  const workbook = new Excel.Workbook();

  try {
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.worksheets[0];
    worksheet.deleteColumnKey("A");
    const row = worksheet.getRow(5);
    row.getCell(1).value = 5; // A5's value set to 5
    row.commit();
    return workbook.xlsx.writeFile(newFilePath || filePath);
  } catch (error) {
    logger.error(error.message);
  }
};
