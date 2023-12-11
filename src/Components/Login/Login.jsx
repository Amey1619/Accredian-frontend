import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, TextField, Typography, Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./index.css";
import axios from "axios";
const Login = () => {
  const initialvalues = { username: "", password: "" };
  const [formData, setFromData] = useState(initialvalues);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isPass, setIsPass] = useState(false);
  const [isLength, setIsLength] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFromData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const val = {
      username: formData.username,
      password: formData.password,
    };
    console.log(val);
    setErrors(Validate(formData));
    setIsSubmit(true);
    try {
      const res = await axios.post("http://localhost:8081/login", val);
      console.log(res);

      if (res.data.success) {
        navigate("/signin");
      } else {
        // Handle unsuccessful login
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      console.log(formData);
    }
  }, [errors]);

  const Validate = (values) => {
    const errors = {};
    if (!values.username) {
      setIsUser(true);
      errors.username = "Username is Required";
    }
    if (!values.password) {
      setIsPass(true);
      errors.password = "Password is Required";
    }
    if (values.password && values.password.length < 7) {
      setIsLength(true);
      errors.password = "Password must have a length of 7 characters";
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
          marginTop={15}
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
            Login
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
          <p>
            Do not have an account{" "}
            <Link to="/signup" className="hook-link">
              Signup
            </Link>
          </p>
          <Button variant="contained" color={"primary"} onClick={handleSubmit}>
            Login
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;
