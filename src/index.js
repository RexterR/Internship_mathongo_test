const express = require("express");
const cron = require("node-cron");
const sendMail = require("./sendMail");
const app = express();
const time = { hours: 12, minutes: 30, seconds: 1 };
cron.schedule(
  `${time.seconds} ${time.minutes} ${time.hours} * *`,
  function () {
    sendMail()
      .then((res) => console.log("Email sent"))
      .catch((err) => console.error(err.message));
  }
);
app.listen(3000, () => console.log("Server is up"));
