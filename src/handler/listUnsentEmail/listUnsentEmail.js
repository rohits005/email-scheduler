const DBConnector = require('../../common/database/dbConnector');
const dbConnector = new DBConnector();

class ListUnsentEmail {

    listUnsentEmail = async (req, res) => {
        try {
            // console.log("list scheduler Request Function", req);
            const { user_email } = req;

            let query = `SELECT * FROM unsent_schedule_emails WHERE status = 1;`;
            let params = [];
        
            let ListUnsentEmailResult = await dbConnector.queryExecute(query, params);
            // console.log("ListUnsentEmailResult", ListUnsentEmailResult);
            if(ListUnsentEmailResult){
                return ListUnsentEmailResult;
            }
            return false;

        } catch (error) {
            console.log("Error in dbConnector file: ", error);
            throw error;
        }

    }
}
module.exports = ListUnsentEmail;