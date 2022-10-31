
const {logger} = require("firebase-functions");
const Excel = require("exceljs");

exports.modify = async (filePath, newFilePath) => {
  const workbook = new Excel.Workbook();

  try {
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1);
    const row = worksheet.getRow(5);
    row.getCell(1).value = 5; // A5's value set to 5
    row.commit();
    return workbook.xlsx.writeFile(newFilePath || filePath);
  } catch (error) {
    logger.error(error.message);
  }
};


