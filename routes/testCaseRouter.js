const express = require("express");
const testCaseController = require("../controllers/testCasesController.js");
const testCaseRouter = express.Router();

testCaseRouter.get("/", testCaseController.getTestCase)
testCaseRouter.get("/:id", testCaseController.getTestCaseById)
testCaseRouter.post("/", testCaseController.createTestCase)
testCaseRouter.delete("/:id", testCaseController.deleteTestCase)
testCaseRouter.put("/:id", testCaseController.updateTestCaseById)
 
module.exports = testCaseRouter;