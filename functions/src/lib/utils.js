/* eslint-disable max-len */
const moment = require("moment");
const {isNil, isEmpty} = require("ramda");

exports.isSameDay = (date1, date2, format = "YYYY-MM-DD") => {
  return moment(date1, format).isSame(moment(date2, format), "d");
};

exports.addDay = (date, amount = 1, format = "YYMMDD") => {
  if (isNil(date) || isEmpty(date)) return null;
  return moment(date, format).add(amount, "day").format(format);
};

exports.moneyFormat = (value = 0) => {
  return value;
  // if (!value) return;
  // const formattedMoney = value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  // return `Rp ${formattedMoney.split(".")[0]}`;
};

exports.getDateFromOrderNo = (orderNo, format = "YYMMDD") => {
  const orderDate = orderNo?.slice(4, 10);
  if (orderDate) return orderDate;
  return moment().format(format);
};

exports.getHeader = (date, format = "ddd_YYMMDD") => {
  if (isNil(date) || isEmpty(date)) null;
  return `KOHVI_BELITUNG_${moment(date, "YYMMDD").format(format)}`;
};
