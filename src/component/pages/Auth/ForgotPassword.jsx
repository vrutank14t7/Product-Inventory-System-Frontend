import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdOutlineNumbers } from "react-icons/md"; // Import the MdOutlineNumbers icon
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import { sendVerificationCodeSchema, updatePasswordSchema, validateSchema, verifyVerificationCodeSchema } from "../../../validation/validationSchema";
import { startLoading, stopLoading } from "../../../redux/slices/loadingSlice";
import axiosInstance from "../../../config/AxiosConfig";
import AxiosInstancePaths from "../../../config/AxiosInstancePaths";
import { showErrorMessage, showSuccessMessage } from "../../../helpers/notificationService";
import { useDispatch } from "react-redux";
import InputError from "../../Basic/InputError";
import { clearLocalStorage, formatErrorObject } from "../../../helpers";

const ForgotPassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const [otpSent, setOtpSent] = useState(false);
  const [time, setTime] = useState(90);
  const [verifiedEmail, setVerifiedEmail] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

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

  const sendVerificationCode = async () => {
    try {

      const data = { email: formData?.email }

      const isValid = await validateSchema(sendVerificationCodeSchema, data, setErrors);
      if (!isValid) {
        return;
      }
      dispatch(startLoading());
      const response = await axiosInstance.post(
        AxiosInstancePaths.Auth.SEND_VERIFICATION_CODE,
        data
      );
      if (response.data?.payload) {
        showSuccessMessage(response.data?.message);
        if (response.data?.payload?.status) {
          setOtpSent(true)
        }
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.errors) {
        setErrors(formatErrorObject(error?.response?.data?.errors))
      }
      showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  }

  const reSendVerificationCode = async () => {
    try {

      const data = { email: formData?.email }

      const isValid = await validateSchema(sendVerificationCodeSchema, data, setErrors);
      if (!isValid) {
        return;
      }
      dispatch(startLoading());
      const response = await axiosInstance.post(
        AxiosInstancePaths.Auth.RESEND_VERIFICATION_CODE,
        data
      );
      if (response.data?.payload) {
        showSuccessMessage(response.data?.message);
        if (response.data?.payload?.status) {
          setOtpSent(true)
        }
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.errors) {
        setErrors(formatErrorObject(error?.response?.data?.errors))
      } showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  }

  const verifyVerificationCode = async () => {
    try {

      const data = { email: formData?.email, verification_code: formData?.verification_code }

      const isValid = await validateSchema(verifyVerificationCodeSchema, data, setErrors);
      if (!isValid) {
        return;
      }
      dispatch(startLoading());
      const response = await axiosInstance.post(
        AxiosInstancePaths.Auth.VERIFY_VERIFICATION_CODE,
        data
      );
      if (response.data?.payload) {
        showSuccessMessage(response.data?.message);
        if (response.data?.payload?.verified) {
          setVerifiedEmail(true)
        }
        setOtpSent(false)
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.errors) {
        setErrors(formatErrorObject(error?.response?.data?.errors))
      } showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  }

  const updatePassword = async () => {
    try {

      const data = { email: formData?.email, new_password: formData?.new_password, confirm_password: formData?.confirm_password }

      const isValid = await validateSchema(updatePasswordSchema, data, setErrors);
      if (!isValid) {
        return;
      }
      dispatch(startLoading());
      const response = await axiosInstance.post(
        AxiosInstancePaths.Auth.CHANGE_PASSWORD,
        data
      );
      if (response.data?.payload) {
        showSuccessMessage(response.data?.message);
        if (response.data?.payload?.status) {
          clearLocalStorage()
          navigate(AxiosInstancePaths.login_path)
        }
      }
      dispatch(stopLoading());
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.errors) {
        setErrors(formatErrorObject(error?.response?.data?.errors))
      } showErrorMessage(error?.response?.data?.message);
      dispatch(stopLoading());
    }
  }


  useEffect(() => {
    let timer;
    if (otpSent && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer); // Cleanup on unmount or when time reaches 0
  }, [otpSent, time]);

  return (
    <Container
      maxWidth="xs"
      style={{ margin: '0rem', padding: "0px" }}
    >
      {otpSent || verifiedEmail ? "" : <TextField
        fullWidth
        className="defaultText"
        label="Email"
        margin="normal"
        InputProps={{
          startAdornment: (
            <div style={{ display: "inline-flex", color: theme.palette.common.black, marginRight: "0.5rem" }}>
              <FaEnvelope />
            </div>
          ),
        }}
        style={{
          input: { padding: "0.8rem 0px", color: theme.palette.common.black },
          '.MuiOutlinedInput-root, .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.common.black },
          '.MuiInputLabel-root': { color: theme.palette.common.black },
          '.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.common.black },
        }}
        onChange={(e) => handleSelectChange("email", e.target.value)}
      />}
      {errors?.email?.message && (
        <div style={{ textAlign: 'left' }}>
          <InputError message={errors.email.message} />
        </div>
      )}
      {otpSent || verifiedEmail ? "" : <Button
        fullWidth
        variant="contained"
        color="primary"
        style={{
          backgroundColor: theme.palette.primary,
          color: theme.palette.common.white,
          marginTop: '0.5rem',
          ':hover': { backgroundColor: theme.palette.secondary },
        }}
        onClick={sendVerificationCode}
      >
        Send Verification Code
      </Button>}



      {otpSent ? <TextField
        fullWidth
        className="defaultText"
        label="OTP"
        margin="normal"
        InputProps={{
          startAdornment: (
            <div style={{ display: "inline-flex", color: theme.palette.common.black, marginRight: "0.5rem" }}>
              <MdOutlineNumbers />
            </div>
          ),
        }}
        style={{
          input: { padding: "0.8rem 0px", color: theme.palette.common.black },
          '.MuiOutlinedInput-root, .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.common.black },
          '.MuiInputLabel-root': { color: theme.palette.common.black },
          '.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.common.black },
        }}
        onChange={(e) => handleSelectChange("verification_code", e.target.value)}
      /> : ''}
      {errors?.verification_code?.message && (
        <div style={{ textAlign: 'left' }}>
          <InputError message={errors.verification_code.message} />
        </div>
      )}
      {otpSent ? <Button
        fullWidth
        variant="contained"
        color="primary"
        style={{
          backgroundColor: theme.palette.primary,
          color: theme.palette.common.white,
          marginTop: '1rem',
          ':hover': { backgroundColor: theme.palette.secondary },
        }}
        onClick={verifyVerificationCode}
      >
        Verify Otp
      </Button> : ''}

      {otpSent ? <div
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          marginTop: "1rem",
          gap: "0.5rem",
        }}
      >
        <Button variant="contained" onClick={reSendVerificationCode} disabled={otpSent && time > 0}
          style={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.common.white,
            ':hover': { backgroundColor: theme.palette.secondary.main },
          }}>
          Resend Code {time > 0 ? `(${time})` : ''}
        </Button>
      </div> : ""}

      {verifiedEmail ? <TextField
        fullWidth
        className="defaultText"
        label="New Password"
        type={showPassword ? "text" : "password"}
        margin="normal"
        InputProps={{
          startAdornment: (
            <div style={{ display: "inline-flex", color: theme.palette.common.black, marginRight: "0.5rem" }}>
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
        style={{
          input: { padding: "0.8rem 0px", color: theme.palette.common.black },
          '.MuiOutlinedInput-root, .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.common.black },
          '.MuiInputLabel-root': { color: theme.palette.common.black },
          '.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.common.black },
        }}
        onChange={(e) => handleSelectChange("new_password", e.target.value)}
      /> : ""}
      {errors?.new_password?.message && (
        <div style={{ textAlign: 'left' }}>
          <InputError message={errors.new_password.message} />
        </div>
      )}
      {verifiedEmail ? <TextField
        fullWidth
        className="defaultText"
        label="Confirm New Password"
        type={showConfirmPassword ? "text" : "password"}
        margin="normal"
        InputProps={{
          startAdornment: (
            <div style={{ display: "inline-flex", color: theme.palette.common.black, marginRight: "0.5rem" }}>
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
        style={{
          input: { padding: "0.8rem 0px", color: theme.palette.common.black },
          '.MuiOutlinedInput-root, .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.common.black },
          '.MuiInputLabel-root': { color: theme.palette.common.black },
          '.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.common.black },
        }}
        onChange={(e) => handleSelectChange("confirm_password", e.target.value)}
      /> : ""}
      {errors?.confirm_password?.message && (
        <div style={{ textAlign: 'left' }}>
          <InputError message={errors.confirm_password.message} />
        </div>
      )}
      {verifiedEmail ? <Button
        fullWidth
        variant="contained"
        color="primary"
        style={{
          backgroundColor: theme.palette.primary,
          color: theme.palette.common.white,
          marginTop: '1rem',
          ':hover': { backgroundColor: theme.palette.secondary },
        }}
        onClick={updatePassword}
      >
        Reset Password
      </Button> : ""}
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
          Remembered Credentials?
        </Typography>
        <Button type="text" onClick={() => navigate("/authentication/login")} style={{
          fontSize: "0.875rem",
          color: theme.palette.primary,
          padding: "0px",
          cursor: "pointer",
          justifyContent: 'end',
          textDecoration: "none",
          backgroundColor: 'transparent',
          ':hover': { color: theme.palette.secondary },
        }}>
          Log in
        </Button>
      </div>
    </Container>
  );
};

export default ForgotPassword;
