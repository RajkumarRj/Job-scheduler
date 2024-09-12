const asyncHandler = require("express-async-handler");
const TaskModel = require("../Model/taskModel");

const newTaskController = asyncHandler(async (req, res) => {
  console.log("Received request");

  const { name, email, date, status } = req.body;

  console.log(req.body);

  if (!name || !date || !email) {
    res.status(400);
    throw new Error("Please enter all fields");
    return;
  }

  const nameExists = await TaskModel.findOne({ name });

  if (nameExists) {
    res.status(400);
    throw new Error("This name is already Exists");
  }

  try {
    const data = await TaskModel.create({
      name: name,
      email: email,
      whenToSend: date,
      status: status,
    });

    res.status(201).json(data);
  } catch (error) {
    res.status(400);
    console.log(error);

    throw new Error("Failed to create a task", error);
  }
});

const getListController = asyncHandler(async (req, res) => {
  const data = await TaskModel.find({}).exec();

  res.json(data);
});

const updateTaskController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, date, status } = req.body;

  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      { name, email, whenToSend: date, status },
      { new: true } // return the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
});

const deleteTaskController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await TaskModel.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
});

module.exports = {
  newTaskController,
  getListController,
  updateTaskController,
  deleteTaskController,
};
