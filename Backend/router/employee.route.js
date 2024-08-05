const express = require("express");
const router = express.Router();
const employeeController = require("../controller/employee.controller.js");

router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.post("/", employeeController.addEmployee);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);
router.post("/:id/salary", employeeController.addSalary);
router.post("/:id/presenty", employeeController.addPresenty);
module.exports = router;
