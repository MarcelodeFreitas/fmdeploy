import axiosInstance from "./axios/axiosInstance";
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
  TextField,
  Button,
} from "@mui/material";

const UpdateUser = ({ user, token, handleMessage, handleRowClick }) => {
  console.log("UpdateUser received props: ", user);

  //form validation
  const validationSchema = Yup.object().shape({
    name: Yup.string().optional(),
    email: Yup.string().email("Invalid email format").optional(),
    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        "Password must contain 8 Characters, One Uppercase, One Lowercase, and One Number"
      )
      .optional(),
    role: Yup.string().oneOf(["user", "admin", "guest"]).optional(),
  });

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    },
    validationSchema,
    onSubmit: (values) => {
      updateUser(values); // Send the form data to the API endpoint here
    },
  });

  const handleClear = () => {
    formik.setValues({
      name: "",
      email: "",
      password: "",
      role: "",
    });
  };

  // update user
  const updateUser = async (values) => {
    console.log("updateUser values: ", values);
    try {
      const response = await axiosInstance.put(
        "/user/admin",
        {
          user_email: user.email,
          new_name: values.name,
          new_email: values.email,
          new_password: values.pasword,
          new_role: values.role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("updateUser response: ", response.data);
      handleMessage("User updated with success!", "success");
      handleRowClick(user.user_id);
    } catch (e) {
      console.log("updateUser error: ", e.response);
      if (e.response && e.response.data) {
        console.log("updateUser error detail: ", e.response.data.detail);
        handleMessage(e.response.data.detail, "error");
      } else {
        handleMessage("An error occurred while updating the user.", "error");
      }
    }
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} sx={{ marginBottom: "15px" }}>
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
              helperText={formik.touched.password && formik.errors.password}
              fullWidth
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
          disabled={Object.values(formik.values).every((value) => value === "")}
          sx={{ marginTop: "15px", marginRight: "15px" }}
        >
          Clear form
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={Object.values(formik.values).every((value) => value === "")}
          sx={{ marginTop: "15px", marginRight: "15px" }}
        >
          Update User
        </Button>
      </form>
    </>
  );
};

export default UpdateUser;
