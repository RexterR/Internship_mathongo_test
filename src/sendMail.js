const objFunc = require("./getObject");
const sendgrid = require("./mail/Sendgrid");
const ObjectsToCsv = require("objects-to-csv");
module.exports =  saveToCSVAndSendEmail = async () => {
  try {
    const result = await objFunc();
    const csv = new ObjectsToCsv(result.result);
    //saving csv
    await csv.toDisk("data/result.csv");
    const sg = new sendgrid(
      `Report - ${new Date().toDateString()}.csv`,
      "sumandas.workplace@gmail.com",
      "das2000suman@gmail.com"
    );
    const htm =
      "<h1>Daily Report<h1><ul><li>Transaction : " +
      result.transaction +
      "</li><li>Successfull Transactions : " +
      result.successfullTransaction +
      "</li><li>Total volume : " +
      result.volume +
      " Rs</li></ul>";
      //Sending Email
    await sg
      .sendEmail("Daily performence report", htm, "data/result.csv")
      .then((res) => console.log("sent"))
      .catch((err) => console.error(err.message));
  } catch (error) {
    console.error(error.message);
  }
};
