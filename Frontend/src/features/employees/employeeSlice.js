import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = "http://localhost:3000/api/v2/employee";

export const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployee",
  async () => {
    try {
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      return console.error("Error in fetchEmployees: ", error.message);
    }
  }
);
export const addEmployee = createAsyncThunk(
  "employee/addEmployee",
  async (employee) => {
    try {
      const response = await axios.post(`${apiUrl}/`, employee);
      return response.data;
    } catch (error) {
      return console.error("Error in addEmployee: ", error.message);
    }
  }
);

export const addSalary = createAsyncThunk(
  "employee/addSalary",
  async ({ id, salary }) => {
    try {
      const response = await axios.post(`${apiUrl}/${id}/salary`, salary);
      return response.data;
    } catch (error) {
      return console.error("Error in addSalary: ", error.message);
    }
  }
);

export const addAttendance = createAsyncThunk(
  "employee/addAttendance",
  async ({ id, attendance }) => {
    try {
      const response = await axios.post(`${apiUrl}/${id}/presenty`, attendance);
      return response.data;
    } catch (error) {
      return console.error("Error in addAttendance: ", error.message);
    }
  }
);

const initialState = {
  employees: [],
  status: "idle",
  error: null,
};

const employeeSlice = createSlice({
  name: "employees",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(addSalary.fulfilled, (state, action) => {
        const employee = state.employees.find(
          (emp) => emp.id === action.payload.id
        );
        if (employee) {
          employee.salary.push(action.payload.salary);
        }
      })
      .addCase(addAttendance.fulfilled, (state, action) => {
        const employee = state.employees.find(
          (emp) => emp.id === action.payload.id
        );
        if (employee) {
          employee.presenty.push(action.payload.attendance);
        }
      });
  },
});

export default employeeSlice.reducer;
