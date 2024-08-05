const Employee = require("../models/employee.model.js");

const getAllEmployees = async (req, res) => {
  try {
    const employee = await Employee.find();
    if (!employee) {
      return res.status(404).json({ message: "No Employee Data" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Error Getting Data", error });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res
        .status(404)
        .json({ message: "Employee not found In Database" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "failed to fetch employee : ", error });
  }
};

const addEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(200).json({ message: "Employee saved Successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error posting data :", error });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found to update" });
    }
    res.status(500).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Failed to update", error });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee does not exist!!!" });
    }
    res.status(200).json({ message: "Employee deleted successFully !!!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete employee : ", error });
  }
};

const addSalary = async (req, res) => {
  const { id } = req.params;
  const { amount, date } = req.body;

  if (!amount || !date) {
    return res.status(400).send({ error: "Amount and date are required" });
  }
  try {
    const trimdate = new Date(date);
    trimdate.setHours(12, 0, 0, 0);

    const employee = await Employee.findByIdAndUpdate(
      id,
      {
        $push: { salary: { amount, date: trimdate } },
      },
      { new: true, runValidators: true }
    );
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json(error);
  }
};

const addPresenty = async (req, res) => {
  const { id } = req.params;
  const { date, present } = req.body;

  if (!date || !present) {
    return res
      .status(400)
      .send({ error: "Presenty status and date are required" });
  }
  try {
    const trimdate = new Date(date);
    trimdate.setHours(12, 0, 0, 0);

    const employee = await Employee.findByIdAndUpdate(
      id,
      {
        $push: { presenty: { date: trimdate, present } },
      },
      { new: true, runValidators: true }
    );
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  addSalary,
  addPresenty,
};
