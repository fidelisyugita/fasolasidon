
const {logger} = require("firebase-functions");
const Excel = require("exceljs");

exports.modify = async (base64, startOrderNo = "28CE22052100000001") => {
  const workbook = new Excel.Workbook();

  const encoded = base64.replace(/^data:\w+\/\w+;base64,/, "");
  const fileBuffer = Buffer.from(encoded, "base64");

  try {
    await workbook.xlsx.load(fileBuffer);
    const worksheet = workbook.worksheets[0];
    worksheet.spliceColumns(2, 1);
    worksheet.spliceColumns(3, 14);
    worksheet.spliceColumns(5, 3);
    worksheet.spliceColumns(6, 2);
    worksheet.spliceColumns(7, 3);
    worksheet.spliceColumns(8, 10);
    worksheet.spliceColumns(9, 9);

    const rowCount = worksheet.actualRowCount;
    for (let i=1; i < rowCount; i++) {
      const row = worksheet.getRow(i+1);
      row.getCell(1).value = startOrderNo + i; // A5's value set to 5
      row.commit();
    }
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
    const row = worksheet.getRow(5);
    row.getCell(1).value = 5; // A5's value set to 5
    row.commit();
    return workbook.xlsx.writeFile(newFilePath || filePath);
  } catch (error) {
    logger.error(error.message);
  }
};
