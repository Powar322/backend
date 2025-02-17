const express = require("express");
const collectionConroller = require("../controllers/collectionConroller.js");
const collectionRouter = express.Router();
 
collectionRouter.post("/create", collectionConroller.addCollection);
collectionRouter.get("/get", collectionConroller.getCollection);
collectionRouter.post("/show", collectionConroller.showCollection);
collectionRouter.delete("/delete", collectionConroller.deleteCollection)
collectionRouter.get("/getbyid", collectionConroller.getByIdCollection)
collectionRouter.get("/getnotincollection", collectionConroller.getAllNotInCollection)
 
module.exports = collectionRouter;