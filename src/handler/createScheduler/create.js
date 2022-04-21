const DBConnector = require('../../common/database/dbConnector');
const dbConnector = new DBConnector();

class CreateScheduler {

    create = async (req, res) => {
        try {
            // console.log("Create scheduler Request Function", req);
            const { to_email_ids, cc_email_ids, bcc_email_ids, email_subject, email_body, schedule_date_time, user_email } = req;

            let query = `INSERT INTO email_schedule_details (to_email_ids, cc_email_ids, bcc_email_ids, email_subject, email_body, schedule_date_time, created_by, updated_by) VALUES (?,?,?,?,?,?,?,?);`;
            let params = [to_email_ids, cc_email_ids, bcc_email_ids, email_subject, email_body, schedule_date_time, user_email, user_email];
        
            let createSchedulerResult = await dbConnector.queryExecute(query, params);
            // console.log("createSchedulerResult", createSchedulerResult);
            if(createSchedulerResult?.affectedRows){
                return createSchedulerResult;
            }
            return false;

        } catch (error) {
            console.log("Error in dbConnector file: ", error);
            throw error;
        }

    }
}
module.exports = CreateScheduler;