const DBConnector = require('../../common/database/dbConnector');
const dbConnector = new DBConnector();

class SchedulerDetails {

    schedulerDetails = async (req, res) => {
        try {          
            let query = `SELECT * FROM email_schedule_details WHERE is_deleted = 0;`;
            let params = [];
        
            let schedulerDetailsResult = await dbConnector.queryExecute(query, params);
            // console.log("schedulerDetailsResult", schedulerDetailsResult);
            if(schedulerDetailsResult){
                return schedulerDetailsResult;
            }
            return false;

        } catch (error) {
            console.log("Error in dbConnector file: ", error);
            throw error;
        }

    }
}
module.exports = SchedulerDetails;