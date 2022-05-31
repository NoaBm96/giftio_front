import React, { useState, useEffect } from "react";
import { AuthForm, Container, SubContainer } from "./Auth.style";
import { Button, Typography } from "@mui/material";
import Input from "./Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../redux/actions/auth";
import AuthHeader from "./AuthHeader/AuthHeader";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import GoogleSignin from "./GoogleSignin";

const initialData = { email: "", password: "", role: "user" };

const Signin = () => {
  const loader = useSelector((state) => state.loaderReducer);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(formData, navigate));
  };

  useEffect(() => {
    sessionStorage.removeItem("profile");
  }, []);

  return (
    <Container>
      <SubContainer>
        <AuthHeader />
        <AuthForm onSubmit={handleSubmit}>
          <Typography variant="h6" color="primary">
            Sign In
          </Typography>
          <Input
            name="email"
            label="Email"
            handleChange={handleChange}
            type="email"
          />
          <Input
            name="password"
            label="Password"
            handleChange={handleChange}
            type={showPassword ? "text" : "password"}
            handleShowPassword={handleShowPassword}
          />
          <Button
            variant="contained"
            type="submit"
            disabled={loader}
            startIcon={
              loader && <CircularProgress color="inherit" size="1.2rem" />
            }
          >
            Sign In
          </Button>
          <GoogleSignin />
          <Typography
            className="sign-action"
            align="right"
            variant="body2"
            color="primary"
            onClick={() => navigate("/signup")}
          >
            Don't have an account? Sign Up
          </Typography>
        </AuthForm>
      </SubContainer>
    </Container>
  );
};

export default Signin;
