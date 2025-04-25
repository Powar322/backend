const express = require("express");
const testCaseCommentsController = require("../controllers/testCaseCommentsController.js");
const testCaseCommentsRouter = express.Router();

testCaseCommentsRouter.get("/", testCaseCommentsController.getTestCaseComments)
testCaseCommentsRouter.get("/:id", testCaseCommentsController.getTestCaseCommentsById)
testCaseCommentsRouter.post("/", testCaseCommentsController.createTestCaseComment)
testCaseCommentsRouter.put("/:id", testCaseCommentsController.updateTestCaseCommentById)
testCaseCommentsRouter.delete("/:id", testCaseCommentsController.deleteTestCaseCommentById)
module.exports = testCaseCommentsRouter;