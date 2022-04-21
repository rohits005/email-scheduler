const DBConnector = require('../../common/database/dbConnector');
const dbConnector = new DBConnector();

class storeUnsentEmails {

    storeUnsent = async (req, res) => {
        try {
            // console.log("storeUnsentEmails scheduler Request Function", req);
            const schedule_date_time = req?.schedule_date_time;
            const unsent_email_reason_r = req?.unsent_email_reason;
            delete req.schedule_date_time;
            delete req.unsent_email_reason;
            const mailOptions = JSON.stringify(req);
            const unsent_email_reason = JSON.stringify(unsent_email_reason_r);
            console.log("mailOptionsParams: " + mailOptions);

            let query = `INSERT INTO unsent_schedule_emails (mail_options, schedule_date_time, unsent_email_reason) VALUES (?,?,?);`;
            let params = [mailOptions, schedule_date_time, unsent_email_reason];
        
            let storeUnsentEmailsResult = await dbConnector.queryExecute(query, params);
            // console.log("storeUnsentEmailsResult", storeUnsentEmailsResult);
            if(storeUnsentEmailsResult?.affectedRows){
                return storeUnsentEmailsResult;
            }
            return false;

        } catch (error) {
            console.log("Error in dbConnector file: ", error);
            throw error;
        }

    }
}
module.exports = storeUnsentEmails;