const express = require("express");
const app = express();
const cors = require("cors");
const Employee = require("./models/employee.model");
const dbConnect = require("./db/db");
const employeeRouter = require("./router/employee.route.js");

const port = 3000;

app.use(cors());
app.use(express.json());

//routes
app.use("/api/v2/employee", employeeRouter);

app.post("/", );

dbConnect();
app.listen(port, () => {
  console.log("Server is listening on port ", port);
});
