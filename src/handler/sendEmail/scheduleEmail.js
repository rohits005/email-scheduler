// To get local envs used dotenv package.
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

let cron = require("node-cron");
let nodemailer = require("nodemailer");
let moment = require("moment");
let tz = require("moment-timezone");

const SchedulerDetails = require("../../common/utils/getScheduleDetails");
const StoreUnsentEmails = require("../../common/utils/unsentEmail");
const schedulerDetails = new SchedulerDetails();
const storeUnsentEmails = new StoreUnsentEmails();

class SendEmail {
  sendEmail = async (req, res) => {
    try {
      const { SENDER_EMAIL, SENDER_EMAIL_PASSWORD } = process.env;

      // Run cron every one minute to check ScheduleDate in DB to send scheduled Email.
      cron.schedule("* * * * * *", async () => {
        console.log("CRON_RUNNING EVERY ONE MINUTE...");
        
        const schedulerDetailsResponse = await schedulerDetails.schedulerDetails( req, res );
      
      let todayTime = moment().tz('Asia/Kolkata').format('MM/DD/YYYY hh:mm:ss a');
      let endTime = moment().add('60', 'seconds').tz('Asia/Kolkata').format('MM/DD/YYYY hh:mm:ss a');
      if(schedulerDetailsResponse){
        for(let i in schedulerDetailsResponse){
          let schedules = schedulerDetailsResponse[i];
          let scheduleTime = moment(schedules?.schedule_date_time).tz('Asia/Kolkata').format('MM/DD/YYYY hh:mm:ss a');
          endTime = moment(schedules?.schedule_date_time).add('60', 'seconds').tz('Asia/Kolkata').format('MM/DD/YYYY hh:mm:ss a');
          // console.log("scheduleTime", scheduleTime);
          // console.log("todayTime", todayTime);
          // console.log("endTime", endTime);
          
          if(todayTime <= scheduleTime && scheduleTime <= endTime){
            console.log("Sending Email...", schedules);

            // e-mail message options
            let mailOptions = {
              from: SENDER_EMAIL,
              to: schedules?.to_email_ids,
              subject: schedules?.email_subject ,
              text: schedules?.email_body,
            };

            // e-mail transport configuration
            let transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: SENDER_EMAIL,
                pass: SENDER_EMAIL_PASSWORD,
              },
            });
              // Send e-mail
              transporter.sendMail(mailOptions, async function (error, info) {
                if (error) {
                  console.log(error);
                  // Unsent/Failed email store to resend later
                  mailOptions.schedule_date_time = schedules?.schedule_date_time;
                  mailOptions.unsent_email_reason = error?.response;
                  await storeUnsentEmails.storeUnsent(mailOptions);
                } else {
                  console.log("Email sent: " + info.response);
                }
            });
            
          } else {
            // Do Nothing
          }
        }

      }
    });

    } catch (error) {
      console.log("error in list handler", error);
      throw error;
    }
  };
}
module.exports = SendEmail;
