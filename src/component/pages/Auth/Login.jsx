import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  TextField,
  Button,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import {
  LoginSchema,
  validateSchema,
} from "../../../validation/validationSchema";
import InputError from "../../Basic/InputError";
import { formatErrorObject, saveLoginData } from "../../../helpers";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../config/AxiosInstancePaths";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../helpers/notificationService";
import { AppConfig } from "../../../config/AppConfig";
import { useTheme } from "@mui/material/styles";

const Login = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.loading.isLoading);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [remember_me, setRemember_me] = useState(false);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleSelectChange = (name, value) => {
    let tempErrors = { ...errors };
    delete tempErrors[name];
    setErrors(tempErrors);

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const isValid = await validateSchema(LoginSchema, formData, setErrors);
      if (!isValid) {
        return;
      }
      dispatch(startLoading());
      const response = await axiosInstance.post(
        AxiosInstancePaths.Auth.LOGIN,
        formData
      );
      if (response.data?.payload) {
        showSuccessMessage(response.data?.message);
        saveLoginData(
          response.data?.payload?.result?.refresh_token,
          response.data?.payload?.result?.access_token,
          response.data?.payload?.result?.user,
          remember_me ? formData : null
        );
        if (!remember_me) {
          localStorage.removeItem(AppConfig.localStorageKeys.login_credentials);
        }
        navigate("/");
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.errors) {
        setErrors(formatErrorObject(error?.response?.data?.errors));
      }
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
    const savedData = localStorage.getItem(
      AppConfig.localStorageKeys.login_credentials
    );
    if (savedData) {
      const data = JSON.parse(savedData);
      if (data?.email && data?.password) {
        setFormData((prevData) => ({
          ...data,
        }));
        setRemember_me(true);
      }
    }
  }, []);

  return (
    <Container maxWidth="xs" style={{ margin: "0rem", padding: "0px" }}>
      <TextField
        fullWidth
        className="defaultText"
        autoComplete="false"
        label="Email*"
        margin="normal"
        value={formData.email}
        InputProps={{
          startAdornment: (
            <div
              style={{
                display: "inline-flex",
                color: theme.palette.common.black,
                marginRight: "0.5rem",
              }}
            >
              <FaEnvelope />
            </div>
          ),
        }}
        onChange={(e) => handleSelectChange("email", e.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleLogin();
          }
        }}
        style={{
          input: { padding: "0.8rem 0px", color: theme.palette.common.black },
          ".MuiOutlinedInput-root, .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.common.black,
          },
          ".MuiInputLabel-root": { color: theme.palette.common.black },
          ".MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            { borderColor: theme.palette.common.black },
        }}
      />
      {errors?.email?.message && (
        <div style={{ textAlign: "left" }}>
          <InputError message={errors.email.message} />
        </div>
      )}
      <TextField
        fullWidth
        className="defaultText"
        autoComplete="false"
        label="Password*"
        type={showConfirmPassword ? "text" : "password"}
        margin="normal"
        value={formData.password}
        InputProps={{
          startAdornment: (
            <div
              style={{
                display: "inline-flex",
                color: theme.palette.common.black,
                marginRight: "0.5rem",
              }}
            >
              <FaLock />
            </div>
          ),
          endAdornment: (
            <IconButton onClick={toggleShowConfirmPassword} size="small">
              {showConfirmPassword ? (
                <FaEyeSlash color={theme.palette.common.black} />
              ) : (
                <FaEye color={theme.palette.common.black} />
              )}
            </IconButton>
          ),
        }}
        onChange={(e) => handleSelectChange("password", e.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleLogin();
          }
        }}
        style={{
          input: { padding: "0.8rem 0px", color: theme.palette.common.black },
          ".MuiOutlinedInput-root, .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.common.black,
          },
          ".MuiInputLabel-root": { color: theme.palette.common.black },
          ".MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            { borderColor: theme.palette.common.black },
        }}
      />
      {errors?.password?.message && (
        <div style={{ textAlign: "left" }}>
          <InputError message={errors.password.message} />
        </div>
      )}
      <div style={{ textAlign: "left" }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={remember_me}
              name="remember_me"
              onChange={(e) => {
                setRemember_me(e.target.checked);
              }}
            />
          }
          label="Remember Me"
        />
      </div>
      <Button
        fullWidth
        variant="contained"
        onClick={handleLogin}
        style={{
          backgroundColor: theme.palette.primary,
          color: theme.palette.common.white,
          marginTop: "0.5rem",
          ":hover": { backgroundColor: theme.palette.secondary },
        }}
      >
        {isLoading ? "Logging in..." : "Log in"}
      </Button>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        <Button
          type="text"
          onClick={() => navigate("/authentication/register")}
          style={{
            fontSize: "0.875rem",
            color: theme.palette.primary,
            padding: "0px",
            cursor: "pointer",
            justifyContent: "end",
            textDecoration: "none",
            backgroundColor: "transparent",
            ":hover": { color: theme.palette.secondary },
          }}
        >
          Sign up
        </Button>
      </div>
    </Container>
  );
};

export default Login;
