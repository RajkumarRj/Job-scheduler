const express = require("express");
require("dotenv").config();
var cors = require("cors");

const app = express();
app.use(cors());

const TaskRoutes = require("./Routes/NewTask");

const corn = require("node-cron");
const DbConnect = require("./DbConnect");
const checkAndSendMessage = require("./Scheduler/Scheduler");

app.use(express.json());

DbConnect();

app.use("/api/task", TaskRoutes);

checkAndSendMessage();

// const simpleTask = () => {
//   console.log("corn jos is running automatically");
// };

// corn.schedule(" * * * * *", simpleTask);

app.listen(5000, () => console.log("Server is up and running"));
