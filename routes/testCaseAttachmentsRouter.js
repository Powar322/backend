const express = require("express");
const upload = require('../upload');
const testCaseAttachmentsController = require("../controllers/testCaseAttachmentsController.js");
const testCaseAttachmentsRouter = express.Router();

//testCaseAttachmentsRouter.get("/", testCaseAttachmentsController.)
testCaseAttachmentsRouter.get("/:id", testCaseAttachmentsController.getAttachmentInfo)
testCaseAttachmentsRouter.post('/', upload.single('file'), testCaseAttachmentsController.uploadAttachment)
testCaseAttachmentsRouter.get('/:id/download', testCaseAttachmentsController.downloadAttachment)
testCaseAttachmentsRouter.delete('/:id', testCaseAttachmentsController.deleteAttachment)

module.exports = testCaseAttachmentsRouter;