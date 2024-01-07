// project imports
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  FilledInput,
} from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimateButton from "../../components/extended/animateButton";
import { LOGIN_VALIDATION } from "../../utils/validations/validation";
import MainAuthWrapper from "./loginWrapper";

import * as storage from "../../utils/storage";
import { LoginUser } from "../../utils/constants/common";
// ================================|| LOGIN ||================================ //

const Login = () => {
  const theme: any = useTheme();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleSubmit = (values: any) => {
    if (
      values?.email === LoginUser?.email &&
      values?.password === LoginUser?.password
    ) {
      const payload = {
        fullName: LoginUser?.name,
        email: LoginUser?.email,
      };
      storage.set("user", payload);
      setErrorMessage("");
      navigate("/");
    } else {
      setErrorMessage("Invalid Email or Password");
    }
  };
  return (
    <MainAuthWrapper title={"Enter Your Email And Password"}>
      <Formik
        initialValues={{
          email: "",
          password: "",
          submit: null,
        }}
        validationSchema={LOGIN_VALIDATION}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-email-login">
                Email
              </InputLabel>
              <FilledInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-email-login"
                >
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-password-login">
                Password
              </InputLabel>
              <FilledInput
                id="outlined-adornment-password-login"
                type={showPassword ? "text" : "password"}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                // label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-password-login"
                >
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            {errorMessage && (
              <Box sx={{ mt: 1, ml: 1 }}>
                <FormHelperText error>{errorMessage}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  SIGN IN
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </MainAuthWrapper>
  );
};

export default Login;
