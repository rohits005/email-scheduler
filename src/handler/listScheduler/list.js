const DBConnector = require('../../common/database/dbConnector');
const dbConnector = new DBConnector();

class ListScheduler {

    list = async (req, res) => {
        try {
            // console.log("list scheduler Request Function", req);
            const { user_email } = req;

            let query = `SELECT * FROM email_schedule_details WHERE created_by = ? AND is_deleted = 0;`;
            let params = [ user_email ];
        
            let listSchedulerResult = await dbConnector.queryExecute(query, params);
            // console.log("listSchedulerResult", listSchedulerResult);
            if(listSchedulerResult){
                return listSchedulerResult;
            }
            return false;

        } catch (error) {
            console.log("Error in dbConnector file: ", error);
            throw error;
        }

    }
}
module.exports = ListScheduler;