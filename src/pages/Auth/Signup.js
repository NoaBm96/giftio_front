import React, { useState, useEffect } from "react";
import { AuthForm, Container, SubContainer } from "./Auth.style";
import { Button, Typography } from "@mui/material";
import Input from "./Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/actions/auth";
import AuthHeader from "./AuthHeader/AuthHeader";
import { useNavigate } from "react-router-dom";
import { CardFlex } from "../../components/Card/Card.style";
import CircularProgress from "@mui/material/CircularProgress";
import GoogleSignin from "./GoogleSignin";

const initialData = {
  givenName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "user",
};

const Signup = () => {
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
    const { confirmPassword, ...data } = formData;
    if (confirmPassword === formData.password) dispatch(signup(data, navigate));
    else alert("Password did not matched.");
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
            Sign Up
          </Typography>
          <CardFlex>
            <Input
              name="givenName"
              label="First Name"
              handleChange={handleChange}
              type="text"
            />
            <Input
              name="lastName"
              label="Last Name"
              handleChange={handleChange}
              type="text"
            />
          </CardFlex>
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
          <Input
            name="confirmPassword"
            handleChange={handleChange}
            label="Confirm Password"
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
            Sign Up
          </Button>
          <GoogleSignin />
          <Typography
            className="sign-action"
            align="right"
            variant="body2"
            color="primary"
            onClick={() => navigate("/signin")}
          >
            All Ready have an account? Sign in
          </Typography>
        </AuthForm>
      </SubContainer>
    </Container>
  );
};

export default Signup;
