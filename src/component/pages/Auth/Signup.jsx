import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  signupSchema,
  validateSchema,
} from "../../../validation/validationSchema";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import axiosInstance from "../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../config/AxiosInstancePaths";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../helpers/notificationService";
import InputError from "../../Basic/InputError";

const Signup = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [terms, setTerms] = useState(false);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleSelectChange = (name, value) => {
    const keys = name.split(".");
    setFormData((prevData) => {
      let newData = { ...prevData };
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = current[keys[i]] || {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });

    setErrors((prevErrors) => {
      let newErrors = { ...prevErrors };
      let current = newErrors;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = current[keys[i]] || {};
        current = current[keys[i]];
      }
      delete current[keys[keys.length - 1]];
      return newErrors;
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSignUp = async () => {
    try {
      const isValid = await validateSchema(signupSchema, formData, setErrors);
      if (!isValid) {
        return;
      }

      if (!terms) {
        const newError = {
          ...errors,
          terms: { message: "Please Accept Terms" },
        };
        setErrors(newError);
        return;
      }
      let clonedForm = structuredClone(formData);
      delete clonedForm.confirm_password;
      dispatch(startLoading());
      const response = await axiosInstance.post(
        AxiosInstancePaths.Auth.SIGN_UP,
        clonedForm
      );
      if (response.data?.payload) {
        showSuccessMessage(response.data?.message);
        navigate("/authentication/login");
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  };

  return (
    <Container maxWidth="xs" style={{ margin: "0rem", padding: "0px" }}>
      <TextField
        fullWidth
        className="defaultText"
        label="Name*"
        margin="normal"
        InputProps={{
          startAdornment: (
            <div
              style={{
                display: "inline-flex",
                color: theme.palette.common.black,
                marginRight: "0.5rem",
              }}
            >
              <FaUser />
            </div>
          ),
        }}
        InputLabelProps={{ style: { color: theme.palette.common.black } }}
        style={{
          input: { padding: "0.8rem 0px", color: theme.palette.common.black },
          ".MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgb(21 94 117)",
          },
          ".MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.common.black,
          },
          ".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            { borderColor: theme.palette.common.black },
        }}
        onChange={(e) => handleSelectChange("name", e.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSignUp();
          }
        }}
      />
      {errors?.name?.message && (
        <div style={{ textAlign: "left" }}>
          <InputError message={errors.name.message} />
        </div>
      )}
      <TextField
        fullWidth
        className="defaultText"
        label="Email*"
        margin="normal"
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
        InputLabelProps={{ style: { color: theme.palette.common.black } }}
        style={{
          input: { padding: "0.8rem 0px", color: theme.palette.common.black },
          ".MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgb(21 94 117)",
          },
          ".MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.common.black,
          },
          ".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            { borderColor: theme.palette.common.black },
        }}
        onChange={(e) => handleSelectChange("email", e.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSignUp();
          }
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
        label="Password*"
        type={showPassword ? "text" : "password"}
        margin="normal"
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
            <IconButton onClick={toggleShowPassword} size="small">
              {showPassword ? (
                <FaEyeSlash color={theme.palette.common.black} />
              ) : (
                <FaEye color={theme.palette.common.black} />
              )}
            </IconButton>
          ),
        }}
        InputLabelProps={{ style: { color: theme.palette.common.black } }}
        style={{
          input: { padding: "0.8rem 0px", color: theme.palette.common.black },
          ".MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgb(21 94 117)",
          },
          ".MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.common.black,
          },
          ".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            { borderColor: theme.palette.common.black },
        }}
        onChange={(e) => handleSelectChange("password", e.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSignUp();
          }
        }}
      />
      {errors?.password?.message && (
        <div style={{ textAlign: "left" }}>
          <InputError message={errors.password.message} />
        </div>
      )}
      <TextField
        fullWidth
        className="defaultText"
        label="Confirm Password*"
        type={showConfirmPassword ? "text" : "password"}
        margin="normal"
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
        InputLabelProps={{ style: { color: theme.palette.common.black } }}
        style={{
          input: { padding: "0.8rem 0px", color: theme.palette.common.black },
          ".MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgb(21 94 117)",
          },
          ".MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.common.black,
          },
          ".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            { borderColor: theme.palette.common.black },
        }}
        onChange={(e) => handleSelectChange("confirm_password", e.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSignUp();
          }
        }}
      />
      {errors?.confirm_password?.message && (
        <div style={{ textAlign: "left" }}>
          <InputError message={errors.confirm_password.message} />
        </div>
      )}
      <div style={{ textAlign: "left" }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={terms}
              name="terms"
              onChange={(e) => {
                setErrors((prevErrors) => {
                  let newErrors = { ...prevErrors };
                  let current = newErrors;
                  delete current?.terms;
                  return newErrors;
                });

                setTerms(e.target.checked);
              }}
            />
          }
          label="I agree the Terms & Conditions*"
        />
      </div>
      {errors?.terms?.message && (
        <div style={{ textAlign: "left" }}>
          <InputError message={errors.terms.message} />
        </div>
      )}
      <Button
        fullWidth
        variant="contained"
        style={{
          backgroundColor: theme.palette.secondary,
          color: theme.palette.common.white,
          marginTop: "0.5rem",
          ":hover": { backgroundColor: theme.palette.secondary },
        }}
        onClick={handleSignUp}
      >
        Sign up
      </Button>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "1rem",
          gap: "0.5rem",
        }}
      >
        <Typography align="center" sx={{ m: 0 }}>
          Already have an account?
        </Typography>

        <Button
          type="text"
          onClick={() => navigate("/authentication/login")}
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
          Log in
        </Button>
      </div>
    </Container>
  );
};

export default Signup;
