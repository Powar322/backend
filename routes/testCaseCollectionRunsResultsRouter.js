const express = require("express");
const testCaseCollectionRunsResultsController = require("../controllers/testCaseCollectionRunsResultsController.js");
const testCaseCollectionRunsResultsRouter = express.Router();

testCaseCollectionRunsResultsRouter.get("/", testCaseCollectionRunsResultsController.getTestCaseCollectionRunsResults)
testCaseCollectionRunsResultsRouter.get("/:id", testCaseCollectionRunsResultsController.getTestCaseCollectionRunsResultsById)
testCaseCollectionRunsResultsRouter.put("/:id", testCaseCollectionRunsResultsController.updateTestCaseCollectionRunsResultsById)

module.exports = testCaseCollectionRunsResultsRouter;