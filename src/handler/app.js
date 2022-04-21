// To get Environment Variables from Local System
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
// Environment Variables
const { APP_PORT } = process.env

// Middlewares
const startup = require("../common/middleware/index")
const express = require("express");
const app = express();
startup(app);

const HTTP_CODE = require("../common/utils/constants");
const responder = require("../common/utils/responder");

// Modules
const CreateScheduler = require("./createScheduler/create");
const ListScheduler = require("./listScheduler/list");
const DeleteScheduler = require("./deleteScheduler/delete");
const UpdateScheduler = require("./updateScheduler/update");
const SendEmail = require("./sendEmail/scheduleEmail");
const ListUnsentEmail = require("./listUnsentEmail/listUnsentEmail");
const createScheduler = new CreateScheduler();
const listScheduler = new ListScheduler();
const deleteScheduler = new DeleteScheduler();
const updateScheduler = new UpdateScheduler();
const sendEmail = new SendEmail();
const listUnsentEmail = new ListUnsentEmail();

// Create Email Scheduler
app.post("/email-scheduler/create", async (request, response) => {
    const reqBody = request?.body
    console.log("Create scheduler Request", reqBody);
    try {
        const createSchedulerResponse =  await createScheduler.create(reqBody, response);
        // console.log("createSchedulerResponse", createSchedulerResponse);
        if(createSchedulerResponse){
            return responder.responseHandler(true, HTTP_CODE.SUCCESS, [], "Email scheduler created successfully", response);
        }
        return responder.responseHandler(false, HTTP_CODE.INTERNAL_SERVER_ERROR, [], "INTERNAL SERVER ERROR", response);
    } catch (error) {
        console.log("error in create handler", error);
        return responder.responseHandler(false, HTTP_CODE.BAD_REQUEST, [], "BAD REQUEST", response);
    }
});

// List Email Schedulers
app.get("/email-scheduler/list", async (request, response) => {
    const reqBody = request?.query
    console.log("list scheduler Request", reqBody);
    try {
        const listSchedulerResponse =  await listScheduler.list(reqBody, response);
        // console.log("listSchedulerResponse", listSchedulerResponse);
        if(listSchedulerResponse){
            return responder.responseHandler(true, HTTP_CODE.SUCCESS, listSchedulerResponse, "Email scheduler listed successfully", response);
        }
        return responder.responseHandler(false, HTTP_CODE.INTERNAL_SERVER_ERROR, [], "INTERNAL SERVER ERROR", response);
    } catch (error) {
        console.log("error in list handler", error);
        return responder.responseHandler(false, HTTP_CODE.BAD_REQUEST, [], "BAD REQUEST", response);
    }
});

// Soft Delete Scheduler
app.post("/email-scheduler/delete", async (request, response) => {
    const reqBody = request?.body
    console.log("delete scheduler Request", reqBody);
    try {
        const deleteSchedulerResponse =  await deleteScheduler.delete(reqBody, response);
        // console.log("deleteSchedulerResponse", deleteSchedulerResponse);
        if(deleteSchedulerResponse){
            return responder.responseHandler(true, HTTP_CODE.SUCCESS, [], "Email scheduler deleted successfully", response);
        }
        return responder.responseHandler(false, HTTP_CODE.INTERNAL_SERVER_ERROR, [], "INTERNAL SERVER ERROR", response);
    } catch (error) {
        console.log("error in delete handler", error);
        return responder.responseHandler(false, HTTP_CODE.BAD_REQUEST, [], "BAD REQUEST", response);
    }
});

// Update Scheduler Time
app.post("/email-scheduler/update", async (request, response) => {
    const reqBody = request?.body
    console.log("update scheduler Request", reqBody);
    try {
        const updateSchedulerResponse =  await updateScheduler.update(reqBody, response);
        // console.log("updateSchedulerResponse", updateSchedulerResponse);
        if(updateSchedulerResponse){
            return responder.responseHandler(true, HTTP_CODE.SUCCESS, [], "Email scheduler updated successfully", response);
        }
        return responder.responseHandler(false, HTTP_CODE.INTERNAL_SERVER_ERROR, [], "INTERNAL SERVER ERROR", response);
    } catch (error) {
        console.log("error in update handler", error);
        return responder.responseHandler(false, HTTP_CODE.BAD_REQUEST, [], "BAD REQUEST", response);
    }
});
// Send Email service
sendEmail.sendEmail();

// List Unsent Email
app.get("/email-scheduler/unsentEmails", async (request, response) => {
    const reqBody = request?.query
    console.log("list unsentEmail Request", reqBody);
    try {
        const listunsentEmailResponse =  await listUnsentEmail.listUnsentEmail(reqBody, response);
        // console.log("listunsentEmailResponse", listunsentEmailResponse);
        if(listunsentEmailResponse){
            return responder.responseHandler(true, HTTP_CODE.SUCCESS, listunsentEmailResponse, "Unsent emails listed successfully", response);
        }
        return responder.responseHandler(false, HTTP_CODE.INTERNAL_SERVER_ERROR, [], "INTERNAL SERVER ERROR", response);
    } catch (error) {
        console.log("error in unsent email list handler", error);
        return responder.responseHandler(false, HTTP_CODE.BAD_REQUEST, [], "BAD REQUEST", response);
    }
});

// App Listining Port
app.listen(APP_PORT, () => {
  console.log(`Server running at: http://localhost:${APP_PORT}/`);
});