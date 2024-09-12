const express = require("express");
const { newTaskController } = require("../Controllers/TaskController");
const { getListController } = require("../Controllers/TaskController");
const { updateTaskController } = require("../Controllers/TaskController");
const { deleteTaskController } = require("../Controllers/TaskController");

const router = express.Router();

router.post("/newtask", newTaskController);
router.get("/all", getListController);
router.put("/:id", updateTaskController);
router.delete("/:id", deleteTaskController);

module.exports = router;
