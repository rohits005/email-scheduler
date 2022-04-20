const DBConnector = require('../../common/database/dbConnector');
const dbConnector = new DBConnector();

class DeleteScheduler {

    delete = async (req, res) => {
        try {
            // console.log("delete scheduler Request Function", req);
            const { scheduler_id, user_email } = req;

            let query = `UPDATE email_schedule_details SET is_deleted = 1 WHERE id = ? AND created_by = ?;`;
            let params = [ scheduler_id, user_email ];
        
            let deleteSchedulerResult = await dbConnector.queryExecute(query, params);
            // console.log("deleteSchedulerResult", deleteSchedulerResult);
            if(deleteSchedulerResult?.affectedRows){
                return deleteSchedulerResult;
            }
            return false;

        } catch (error) {
            console.log("Error in dbConnector file: ", error);
            throw error;
        }

    }
}
module.exports = DeleteScheduler;