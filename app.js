const express = require("express")
const cors = require("cors")
const app = express();
const testCaseCollectionRouter = require('./routes/testCaseCollectionRouter.js')
const testCaseRouter = require('./routes/testCaseRouter.js')
const testCaseStepsRouter = require('./routes/testCaseStepRouter.js')
const testCaseCollectionRunsRouter = require('./routes/testCaseCollectionRunsRouter.js')
const bodyParser = require('body-parser')
const testCaseCollectionRunsResultsRouter = require("./routes/testCaseCollectionRunsResultsRouter.js");
app.use(cors())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('content-type', 'application/json');
    next()
});
app.use(bodyParser.json())
app.use("/testCaseCollections", testCaseCollectionRouter)
app.use("/testcases", testCaseRouter)
app.use("/steps", testCaseStepsRouter)
app.use("/collectionRuns", testCaseCollectionRunsRouter)
app.use("/collectionRunsResult", testCaseCollectionRunsResultsRouter);

 
app.listen(3000);