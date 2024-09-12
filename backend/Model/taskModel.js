const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    whenToSend: {
      type: Date,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  }
);

const TaskModel = mongoose.model("newTasks", taskSchema);

module.exports = TaskModel;
