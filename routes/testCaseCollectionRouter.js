const express = require("express");
const testCaseCollectionController = require("../controllers/testCaseCollectionController");
const testCaseCollectionRouter = express.Router();

testCaseCollectionRouter.get("/", testCaseCollectionController.getTestCaseCollection);
testCaseCollectionRouter.get("/:id", testCaseCollectionController.getTestCaseCollectionById);
testCaseCollectionRouter.post("/", testCaseCollectionController.createTestCaseCollection);
testCaseCollectionRouter.delete("/:id", testCaseCollectionController.deleteTestCaseCollectionById)
 
module.exports = testCaseCollectionRouter;