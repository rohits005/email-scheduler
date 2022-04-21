const DBConnector = require('../../common/database/dbConnector');
const dbConnector = new DBConnector();

class UpdateScheduler {

    update = async (req, res) => {
        try {
            // console.log("update scheduler Request Function", req);
            const { scheduler_id, user_email, schedule_date_time } = req;

            let query = `UPDATE email_schedule_details SET schedule_date_time = ? WHERE id = ? AND created_by = ?;`;
            let params = [ schedule_date_time, scheduler_id, user_email ];
        
            let updateSchedulerResult = await dbConnector.queryExecute(query, params);
            // console.log("updateSchedulerResult", updateSchedulerResult);
            if(updateSchedulerResult?.affectedRows){
                return updateSchedulerResult;
            }
            return false;

        } catch (error) {
            console.log("Error in dbConnector file: ", error);
            throw error;
        }

    }
}
module.exports = UpdateScheduler;