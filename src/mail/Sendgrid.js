const fs = require("fs");
const apiKey = process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY;

module.exports = class Sendgrid {
  constructor(name, from, to) {
    this.sgMail = require("@sendgrid/mail");
    this.sgMail.setApiKey(apiKey);
    this.name = name;
    this.from = from;
    this.to = to;
  }
  async sendEmail(subject, html, attachmentPath) {
    const attachment = fs.readFileSync(attachmentPath).toString("base64");
    const messsage = {
      to: this.to,
      from: this.from,
      subject,
      html,
      attachments: [
        { content: attachment, filename: this.name, disposition: "attachment" },
      ],
    };
    try {
      await this.sgMail.send(messsage);
    } catch (error) {
      console.error(error.messsage);
    }
  }
};
