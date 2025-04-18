const express = require("express");
const testCaseStepsController = require("../controllers/testCaseStepsController.js");
const testCaseStepsRouter = express.Router();

testCaseStepsRouter.get("/", testCaseStepsController.getTestCaseSteps)
testCaseStepsRouter.get("/:id", testCaseStepsController.getTestCaseStepById)
testCaseStepsRouter.post("/", testCaseStepsController.createTestCaseStep)
testCaseStepsRouter.put("/:id", testCaseStepsController.updateTestCaseStep)
testCaseStepsRouter.delete("/:id", testCaseStepsController.deleteTestCaseStep)

module.exports = testCaseStepsRouter;