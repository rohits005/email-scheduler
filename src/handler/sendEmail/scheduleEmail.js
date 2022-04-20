let cron = require("node-cron");
let nodemailer = require("nodemailer");

const SchedulerDetails = require("../../common/utils/getScheduleDetails");
const schedulerDetails = new SchedulerDetails();

class SendEmail {
  sendEmail = async (req, res) => {
    try {
      const schedulerDetailsResponse = await schedulerDetails.schedulerDetails( req, res );
      console.log(schedulerDetailsResponse);

      // e-mail message options
      let mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: process.env.RECIEVER_EMAIL,
        subject: "Hello, Greetings! This is a Test Message.",
        text: "Hi, Greetings! This email is sent for Testing Purpose. Please ignore",
      };

      // e-mail transport configuration
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SENDER_EMAIL,
          pass: process.env.SENDER_EMAIL_PASSWORD,
        },
      });

      cron.schedule("* * * * *", () => {
        // Send e-mail
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      });
      
    } catch (error) {
      console.log("error in list handler", error);
      throw error;
    }
  };
}
module.exports = SendEmail;
