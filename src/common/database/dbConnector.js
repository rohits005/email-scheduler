const mysql = require('mysql2');
// create the connection
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

class Database {

    queryExecute = async (query, params) => {
        try {
            console.log("sqlDbQuery : ", query);
            console.log("sqlDbParams : ", params);
            const promisePool = pool.promise();
            const [queryResult, fields] = await promisePool.query(query, params);
            // console.log("queryResult", queryResult);
            if (!queryResult) {
                console.log(" ! queryResult", queryResult);
                return false;
            }
            return queryResult;
        } catch (error) {
            console.log("Error in dbConnector file: ", error);
            throw error;
        }

    }
}
module.exports = Database;
