import { Box, TextField, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./index.css";
const Signup = () => {
  const initialvalues = {
    username: "",
    email: "",
    password: "",
    cnfpassword: "",
  };
  const [formData, setFromData] = useState(initialvalues);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isRegex, setIsRegex] = useState(false);
  const [isPass, setIsPass] = useState(false);
  const [iscnfPass, setIscnfPass] = useState(false);
  const [isLength, setIsLength] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFromData({ ...formData, [name]: value });
  };

  // ...

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate the form fields before making the API call
    const validationErrors = Validate(formData);

    // If there are validation errors, set them in the state and prevent the API call
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmit(true);
      return;
    }

    try {
      // Make the Axios request to your backend
      const val = {
        name: formData.username,
        email: formData.email,
        password: formData.password,
      };
      console.log(val);
      const response = await axios.post(`http://localhost:8081/signup`, val);

      // Check the response and perform actions accordingly
      console.log(response);

      // Assuming the backend returns a success message or some indicator
      if (response.data.success) {
        // Redirect the user to the sign-in page or perform any other actions
        // You may need to import the `navigate` function from your router library
        // and replace it with the appropriate navigation logic
        navigate("/signIn");
      }
    } catch (error) {
      // Handle any errors that occurred during the API call
      console.error("API call failed:", error);
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      console.log(formData);
    }
  }, [errors]);

  const Validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2.}$/i;
    if (!values.username) {
      setIsUser(true);
      errors.username = "Username is Required";
    }
    if (!values.email) {
      setIsEmail(true);
      errors.email = "Email is required";
    }
    const check = regex.test(values.email);
    if (check) {
      setIsRegex(true);
      errors.email = "Invalid Email";
    }
    if (!values.password) {
      setIsPass(true);
      errors.password = "Password is required";
    }
    if (values.password && values.password.length < 7) {
      setIsLength(true);
      errors.password = "Password must have a length 7 characters";
    }
    if (!values.cnfpassword || values.password !== values.cnfpassword) {
      setIscnfPass(true);
      errors.cnfpassword = "Please! confirm your Password";
    }
    return errors;
  };

  return (
    <div>
      <form>
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={500}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
          marginTop={13}
          padding={4}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Typography variant="h2" padding={3} textAlign="center">
            SignUp
          </Typography>
          <TextField
            margin="normal"
            sx={{ width: 300 }}
            variant="outlined"
            type={"text"}
            name="username"
            label="Username"
            value={formData.username}
            onChange={handlechange}
          />
          {isUser && (
            <Alert
              severity="error"
              style={{ marginTop: "10px", borderRadius: "5px" }}
            >
              {errors.username}
            </Alert>
          )}
          <TextField
            margin="normal"
            sx={{ width: 300 }}
            variant="outlined"
            type={"email"}
            name="email"
            label="Email Address"
            value={formData.email}
            onChange={handlechange}
          />
          {isEmail && (
            <Alert
              severity="error"
              style={{ marginTop: "10px", borderRadius: "5px" }}
            >
              {errors.email}
            </Alert>
          )}
          {isRegex && (
            <Alert
              severity="error"
              style={{ marginTop: "10px", borderRadius: "5px" }}
            >
              {errors.email}
            </Alert>
          )}
          <TextField
            margin="normal"
            sx={{ width: 300 }}
            variant="outlined"
            type={showPassword ? "text" : "password"}
            name="password"
            label="Password"
            value={formData.password}
            onChange={handlechange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {isPass && (
            <Alert
              severity="error"
              style={{ marginTop: "10px", borderRadius: "5px" }}
            >
              {errors.password}
            </Alert>
          )}
          {isLength && (
            <Alert
              severity="error"
              style={{ marginTop: "10px", borderRadius: "5px" }}
            >
              {errors.password}
            </Alert>
          )}
          <TextField
            margin="normal"
            sx={{ width: 300 }}
            variant="outlined"
            type={showPassword ? "text" : "password"}
            name="cnfpassword"
            label="Confirm password"
            value={formData.cnfpassword}
            onChange={handlechange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {iscnfPass && (
            <Alert
              severity="error"
              style={{ marginTop: "10px", borderRadius: "5px" }}
            >
              {errors.cnfpassword}
            </Alert>
          )}
          <p>
            Already a User?{" "}
            <Link to="/" className="hook-link">
              Sign in
            </Link>
          </p>
          <Button variant="contained" color={"primary"} onClick={handleSubmit}>
            Singup
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Signup;
