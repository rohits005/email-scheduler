exports.responseHandler = function(status, statusCode, resPayload, message, res) {
    // console.log("responseHandler resPayload: ", resPayload);
    if (resPayload) {
        res.status(200).json({
            status: status ? "SUCCESS" : "FAILURE",
            statusCode: statusCode || 500,
            message: message || "Internal Server Error",
            payload: resPayload || [],
        });
    }
};
