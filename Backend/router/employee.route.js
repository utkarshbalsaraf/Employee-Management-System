const express = require("express");
const router = express.Router();
const employeeController = require("../controller/employee.controller.js");

router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.post("/", employeeController.addEmployee);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);
router.post("/:id/salary", employeeController.addSalary);
router.delete("/:id/salary/:salaryId", employeeController.deleteSalary);
router.post("/:id/presenty", employeeController.addPresenty);
router.delete("/:id/presenty/:presentyId", employeeController.deletePresenty);
module.exports = router;
