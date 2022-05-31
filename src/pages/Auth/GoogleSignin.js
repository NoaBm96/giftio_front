import React from "react";
import { GoogleLogin } from "react-google-login";
import GoogleIcon from "@mui/icons-material/Google";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess, warning } from "../../utils/notification";
import CircularProgress from "@mui/material/CircularProgress";
import * as type from "../../redux/types";

const GoogleSignin = () => {
  const loader = useSelector((state) => state.loaderReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    dispatch({ type: type.LOADER, payload: true });
    try {
      dispatch({ type: type.AUTH, payload: { result, token } });
      navigate("/");
      loginSuccess();
    } catch (error) {
      warning(error.message);
    }
    dispatch({ type: type.LOADER, payload: false });
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful. Try Again Later");
  };

  return (
    <GoogleLogin
      clientId="783321821285-aturojtt7to3ocmo7bg1jgl6kju6r0p0.apps.googleusercontent.com"
      onSuccess={googleSuccess}
      onFailure={googleFailure}
      cookiePolicy="single_host_origin"
      SameSite="None"
      render={(renderProps) => (
        <Button
          onClick={renderProps?.onClick}
          disabled={loader}
          startIcon={
            loader ? (
              <CircularProgress color="inherit" size="1.2rem" />
            ) : (
              <GoogleIcon />
            )
          }
          variant="contained"
        >
          Google Sign In
        </Button>
      )}
    />
  );
};

export default GoogleSignin;
