const moment = require("moment");
const {isNil, isEmpty} = require("ramda");

exports.isSameDay = (date1, date2, format = "YYYY-MM-DD") => {
  return moment(date1, format).isSame(moment(date2, format), "d");
};

exports.addDay = (date, amount =1, format = "YYMMDD") => {
  if (isNil(date) || isEmpty(date)) return null;
  return moment(date, format).add(amount, "day").format(format);
};
