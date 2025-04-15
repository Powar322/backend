const express = require("express");
const testCaseCollectionRunsController = require("../controllers/testCaseCollectionRunsController.js");
const testCaseCollectionRunsRouter = express.Router();

testCaseCollectionRunsRouter.get("/", testCaseCollectionRunsController.getTestCaseCollectionRuns)
testCaseCollectionRunsRouter.get("/:id", testCaseCollectionRunsController.getTestCaseCollectionRunById)
testCaseCollectionRunsRouter.get("/:id/stats", testCaseCollectionRunsController.getTestCaseCollectionRunStatsById)
testCaseCollectionRunsRouter.post("/", testCaseCollectionRunsController.createTestCaseCollectionRuns)
testCaseCollectionRunsRouter.delete("/:id", testCaseCollectionRunsController.deleteTestCaseCollectionRunsById)
testCaseCollectionRunsRouter.put("/:id", testCaseCollectionRunsController.updateTestCaseCollectionRunsById)

module.exports = testCaseCollectionRunsRouter;