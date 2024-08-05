const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  location: { type: String, required: [true, "address location required"] },
  city: { type: String, required: [true, "address city required"] },
  state: { type: String, required: [true, "address state required"] },
  zipcode: { type: Number, required: [true, "address zipcode required"] },
});

const salarySchema = new mongoose.Schema({
  amount: Number,
  date: Date,
});

const presentySchema = new mongoose.Schema({
  date: Date,
  present: { type: Boolean, default: false },
});

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name required"],
    },
    email: {
      type: String,
      required: [true, "Email required"],
    },
    phoneno: {
      type: Number,
      required: [true, "Phone Number required"],
      default: 0,
    },
    department: {
      type: String,
      required: [true, "Department required"],
    },
    education: {
      type: String,
      required: [true, "Education required"],
    },
    birthdate: { type: Date, required: [true, "Birthdate required"] },
    address: addressSchema,
    salary: [salarySchema],
    presenty: [presentySchema],
  },
  { timestamps: true }
);

employeeSchema.pre("save", function (next) {
  if (this.birthdate) {
    const birthdate = new Date(this.birthdate);
    birthdate.setUTCHours(12, 0, 0, 0);
    this.birthdate = birthdate;
  }

  this.salary.forEach((sal) => {
    const salaryDate = new Date(sal.date);
    salaryDate.setUTCHours(12, 0, 0, 0);
    sal.date = salaryDate;
  });

  this.presenty.forEach((present) => {
    const salaryDate = new Date(present.date);
    salaryDate.setUTCHours(12, 0, 0, 0);
    present.date = salaryDate;
  });

  next();
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
