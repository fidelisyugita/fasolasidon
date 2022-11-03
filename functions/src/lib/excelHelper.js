const {logger} = require("firebase-functions");
const Excel = require("exceljs");
const {isNil, isEmpty} = require("ramda");

const {addDay} = require("./utils");

exports.modify = async (base64, lastOrderNo = "", percentage = 50) => {
  const workbook = new Excel.Workbook();

  const encoded = base64.replace(/^data:\w+\/\w+;base64,/, "");
  const fileBuffer = Buffer.from(encoded, "base64");

  try {
    await workbook.xlsx.load(fileBuffer);
    const worksheet = workbook.worksheets[0];

    let orderDate = addDay(lastOrderNo?.slice(4, 10));
    if (isNil(lastOrderNo) || isEmpty(lastOrderNo)) {
      lastOrderNo = worksheet.getRow(2).getCell(1).value;
      orderDate = lastOrderNo?.slice(4, 10) || "";
    }
    const prefixOrderNo = `${lastOrderNo?.slice(0, 4)}${orderDate}`;
    let suffixOrderNo = Number(lastOrderNo?.slice(10, 18) || "00000000");

    /**
     * remove unnecessary column
     */
    worksheet.spliceColumns(2, 1);
    worksheet.spliceColumns(3, 14);
    worksheet.spliceColumns(5, 3);
    worksheet.spliceColumns(6, 2);
    worksheet.spliceColumns(7, 3);
    worksheet.spliceColumns(8, 10);
    worksheet.spliceColumns(9, 9);

    /**
     * prepare compression
     */
    let removeCount = 1; // in row
    let removeEvery = 1; // per row
    if (percentage < 20) percentage = 20;
    if (percentage > 80) percentage = 80;
    if (percentage < 50) {
      removeCount = parseInt((100 - percentage) / percentage);
    } else {
      removeEvery = parseInt(percentage / (100 - percentage));
    }

    /**
     * modify order no & remove unnecessary row
     */
    let rowCount = worksheet.actualRowCount;
    let i = 1;
    while (i < rowCount) {
      const row = worksheet.getRow(i + 1); // first row after header
      const prevRow = worksheet.getRow(i);
      if (row.getCell(2).value != prevRow.getCell(2).value) {
        suffixOrderNo += 1;
        // console.log("suffixOrderNo: ", suffixOrderNo);
      }
      row.getCell(1).value = `${prefixOrderNo}${suffixOrderNo}`;
      row.commit();
      if (i % removeEvery == 0) {
        worksheet.spliceRows(i + 2, removeCount);
        rowCount -= removeCount;
      }
      i += 1;
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
