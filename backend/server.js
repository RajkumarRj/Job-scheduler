const express = require("express");
require("dotenv").config();
var cors = require("cors");

const app = express();

const allowedOrigins = ['https://66e330ada4d2970ac888f9aa--nimble-strudel-e0c6fd.netlify.app/'];

app.use(cors({
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
}));

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
