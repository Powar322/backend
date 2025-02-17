const express = require("express");
const testCaseConroller = require("../controllers/testCaseController.js");
const testCaseRouter = express.Router();
 
testCaseRouter.get("/get", testCaseConroller.getTestCase);
testCaseRouter.post("/create", testCaseConroller.addTestCase);
testCaseRouter.get("/getbyidcol", testCaseConroller.getByColTestCase)
testCaseRouter.get("/getbyid", testCaseConroller.getByIdtestCase);
testCaseRouter.post("/createteststep", testCaseConroller.createTestStep)
testCaseRouter.get("/getstepsbyidtestcase", testCaseConroller.getStepsByIdtestCase)
//testCaseRouter.delete("/delete", testCaseConroller.deleteTestCase)
//testCaseRouter.get("/getbyid", testCaseConroller.getByIdTestCase)
 
module.exports = testCaseRouter;