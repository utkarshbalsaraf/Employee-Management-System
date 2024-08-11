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

export const fetchEmployeeById = createAsyncThunk(
  "employee/fetchEmployeeById",
  async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/${id}`);
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
      console.log(response.data);

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

export const deleteSalary = createAsyncThunk(
  "employee/deleteSalary",
  async ({ id, salaryId }) => {
    try {
      const response = await axios.delete(`${apiUrl}/${id}/salary/${salaryId}`);
      return { id, salaryId };
    } catch (error) {
      return console.error("Error in deleteSalary: ", error.message);
    }
  }
);

export const deletePresenty = createAsyncThunk(
  "employee/deletePresenty",
  async ({ id, presentyId }) => {
    try {
      const response = await axios.delete(
        `${apiUrl}/${id}/presenty/${presentyId}`
      );
      return { id, presentyId };
    } catch (error) {
      return console.error("Error in deletePresenty: ", error.message);
    }
  }
);

const initialState = {
  employees: [],
  selectedEmployee: null,
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
      .addCase(fetchEmployeeById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedEmployee = action.payload;
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees.push(action.payload);
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addSalary.fulfilled, (state, action) => {
        state.status = "succeeded";
        const employee = state.employees.find(
          (emp) => emp.id === action.payload.id
        );
        if (employee) {
          employee.salary.push(action.payload.salary);
        }
      })
      .addCase(addSalary.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addAttendance.fulfilled, (state, action) => {
        state.status = "succeeded";
        const employee = state.employees.find(
          (emp) => emp.id === action.payload.id
        );
        if (employee) {
          employee.presenty.push(action.payload.attendance);
        }
      })
      .addCase(addAttendance.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteSalary.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { id, salaryId } = action.payload;
        const employee = state.employees.find((emp) => emp._id === id);

        if (employee) {
          employee.salary = employee.salary.filter(
            (sal) => sal._id !== salaryId
          );
        }
      })
      .addCase(deleteSalary.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deletePresenty.fulfilled, (state, action) => {
        const { id, presentyId } = action.payload;
        const employee = state.employees.find((emp) => emp._id === id);
        if (employee) {
          employee.presenty = employee.presenty.filter(
            (pr) => pr._id !== presentyId
          );
        }
      })
      .addCase(deletePresenty.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default employeeSlice.reducer;
