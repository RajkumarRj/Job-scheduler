const cron = require("node-cron");
const TaskModel = require("../Model/taskModel");
const moment = require("moment-timezone");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendEmail = (to, sub, msg) => {
  transporter.sendMail({
    to: to,
    subject: sub,
    html: msg,
  });

  console.log("Email Sent");
};

const checkAndSendMessage = () => {
  const job = cron.schedule(" * * * * *", async () => {
    try {
      const currentTimeIST = moment().tz("Asia/Kolkata");

      const oneMinuteFromNowIST = currentTimeIST.clone().add(1, "minute");

      const currentTimeDate = currentTimeIST.toDate();
      const oneMinuteFromNowDate = oneMinuteFromNowIST.toDate();
      console.log(currentTimeDate);

      const reminders = await TaskModel.find({
        whenToSend: {
          $gte: currentTimeDate, // In IST
          $lte: oneMinuteFromNowDate, // In IST
        },
        status: true,
      });

      reminders.forEach((reminder) => {
        sendEmail(
          reminder.email,
          "Tasks are Waiting",
          `Your Scheduled Task is about to End "${reminder.name}"`
        );
        console.log(
          "Reminder Time (IST):",
          moment(reminder.whenToSend)
            .tz("Asia/Kolkata")
            .format("YYYY-MM-DDTHH:mm:ss")
        );
      });
    } catch (error) {
      console.error("Error in Cron Job", error);
    }
  });

  console.log("Reminder cron job started");
  return job;
};

module.exports = checkAndSendMessage;
