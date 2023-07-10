import React from "react";
import { useState, useEffect, useContext } from "react";
import Sidebar from "../../Sidebar";
import "../../Sidebar.css";
import "./Main.css";
import AppHeader from "../../AppHeader";
import StoreContext from "../../Store/Context";
import CustomizedSnackbar from "../../Alert";
import UpdateUser from "../../UpdateUser";
import Cards from "../../Cards";
import axiosInstance from "../../axios/axiosInstance";
import { useFormik } from "formik";
import {} from "@material-ui/core";
import * as Yup from "yup";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  IconButton,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

function ManageUsers() {
  const { token } = useContext(StoreContext);

  //handle messages
  const [message, setMessage] = useState({
    message: "",
    severity: "",
  });
  //handle messages for the child components
  const handleMessage = (message, severity) => {
    setMessage({ message: "", severity: "" });
    setMessage({ message: message, severity: severity });
  };

  const [users, setUsers] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/user/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("fetchUsers: ", response.data);
        setFilteredUsers(response.data);
        setUsers(response.data);
      } catch (e) {
        console.log("fetchUsers error: ", e.response);
        if (e.response && e.response.data) {
          console.log("fetchUsers error detail: ", e.response.data.detail);
          handleMessage(e.response.data.detail, "error");
        } else {
          handleMessage("An error occurred while fetching users.", "error");
        }
      }
    };
    fetchUsers();
  }, [token, message]);

  //_______________________________________
  // create user with any role
  const createUser = async (values) => {
    console.log("createUser values: ", values, token);
    try {
      const response = await axiosInstance.post("/user/admin", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("createUser response: ", response.data);
      handleMessage("User created with success!", "success");
    } catch (e) {
      console.log("createUser error: ", e.response);
      if (e.response && e.response.data) {
        console.log("createUser error detail: ", e.response.data.detail);
        handleMessage(e.response.data.detail, "error");
      } else {
        handleMessage("An error occurred while creating the user.", "error");
      }
    }
  };

  //form validation
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        "Password must contain 8 Characters, One Uppercase, One Lowercase, and One Number"
      )
      .required("Required"),
    role: Yup.string().oneOf(["user", "admin", "guest"]).required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema,
    onSubmit: (values) => {
      createUser(values); // Send the form data to the API endpoint here
    },
  });

  const handleClear = (formik) => {
    formik.resetForm();
  };
  //_______________________________________

  // handle collapsible table
  const [expandedRows, setExpandedRows] = useState([]);
  const handleRowClick = (userId) => {
    const isRowExpanded = expandedRows.includes(userId);

    if (isRowExpanded) {
      setExpandedRows(expandedRows.filter((id) => id !== userId));
    } else {
      setExpandedRows([...expandedRows, userId]);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    filterUsers();
  };

  const filterUsers = () => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.user_id.toString().includes(searchQuery.toLowerCase()) ||
          user.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  return (
    <>
      <Sidebar />
      <CustomizedSnackbar
        message={message.message}
        severity={message.severity}
      />
      <div className="main">
        <AppHeader title="User Management" />
        <Box sx={{ width: "100%", marginTop: "4vh" }}>
          <Stack spacing={2}>
            <Paper sx={{ padding: "10px" }}>
              <div style={{ marginBottom: "15px" }}>
                <Typography variant="h6">Add User</Typography>
                <Typography variant="subtitle1">
                  Fill out the form below to add a new user.
                </Typography>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      id="name"
                      name="name"
                      label="Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.name && formik.errors.name}
                      helperText={formik.touched.name && formik.errors.name}
                      fullWidth
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      id="email"
                      name="email"
                      label="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.email && formik.errors.email}
                      helperText={formik.touched.email && formik.errors.email}
                      fullWidth
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.password && formik.errors.password}
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                      fullWidth
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl
                      error={formik.touched.role && formik.errors.role}
                      fullWidth
                      required
                    >
                      <InputLabel id="role-label">Role</InputLabel>
                      <Select
                        variant="standard"
                        id="role"
                        name="role"
                        labelId="role-label"
                        value={formik.values.role}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="guest">Guest</MenuItem>
                      </Select>
                      {formik.touched.role && formik.errors.role && (
                        <FormHelperText>{formik.errors.role}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  type="reset"
                  onClick={() => handleClear(formik)}
                  disabled={Object.values(formik.values).every(
                    (value) => value === ""
                  )}
                  sx={{ marginTop: "15px", marginRight: "15px" }}
                >
                  Clear form
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!formik.isValid || !formik.dirty}
                  sx={{ marginTop: "15px", marginRight: "15px" }}
                >
                  Create User
                </Button>
              </form>
            </Paper>
            <Paper sx={{ padding: "10px" }}>
              <div style={{ marginBottom: "15px" }}>
                <Typography variant="h6">Manage Users</Typography>
                <Typography variant="subtitle1">
                  Searchbar: search for users by name or email.
                </Typography>
              </div>
              <form onSubmit={handleSearchSubmit}>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  sx={{ paddingBottom: "15px" }}
                >
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      id="search"
                      name="search"
                      label="Search by Name, ID, Email, or Role"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      sx={{ marginTop: "15px" }}
                    >
                      Search
                    </Button>
                  </Grid>
                </Grid>
              </form>
              <TableContainer
                component={Paper}
                sx={{
                  width: "100%",
                  marginTop: "15px",
                  overflowX: "auto",
                  maxHeight: "45vh",
                }}
              >
                <Table
                  sx={{
                    minWidth: 650,
                    borderCollapse: "collapse",
                    borderSpacing: 0,
                  }}
                >
                  <TableHead
                    sx={{
                      maxHeight: 400,
                      "& .MuiTableCell-head": {
                        backgroundColor: "#0385B0",
                        color: "#FFFFFF",
                        position: "sticky",
                        top: 0,
                      },
                    }}
                  >
                    <TableRow>
                      <TableCell color="primary" />
                      <TableCell color="primary">User ID</TableCell>
                      <TableCell color="primary">Name</TableCell>
                      <TableCell color="primary">Email</TableCell>
                      <TableCell color="primary">Role</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <React.Fragment key={user.user_id}>
                        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                          <TableCell>
                            <IconButton
                              onClick={() => handleRowClick(user.user_id)}
                              size="small"
                            >
                              {expandedRows.includes(user.user_id) ? (
                                <KeyboardArrowUp />
                              ) : (
                                <KeyboardArrowDown />
                              )}
                            </IconButton>
                          </TableCell>
                          <TableCell>{user.user_id}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.role}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            style={{ paddingBottom: 0, paddingTop: 0 }}
                            colSpan={6}
                          >
                            <Collapse
                              in={expandedRows.includes(user.user_id)}
                              timeout="auto"
                              unmountOnExit
                            >
                              <Box sx={{ margin: 2 }}>
                                <Typography
                                  variant="h6"
                                  gutterBottom
                                  component="div"
                                  sx={{ marginBottom: "15px" }}
                                >
                                  Edit user
                                </Typography>
                                <UpdateUser
                                  user={user}
                                  token={token}
                                  handleMessage={handleMessage}
                                  handleRowClick={handleRowClick}
                                />
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Stack>
        </Box>
      </div>
      <Cards />
    </>
  );
}

export default ManageUsers;
