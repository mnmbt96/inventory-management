import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Box,
  Avatar,
  FormControl,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  AuthContainer,
  StyledButton,
  StyledForm,
  StyledLink,
  StyledPaper,
  StyledTextField,
  StyledTypography,
} from "./styles";
import { Visibility, VisibilityOff, LockOutlined } from "@mui/icons-material";
import { auth, endLoading, startLoading } from "../../actions/action.ts";
import { UserType } from "../../types/types.ts";
import { API } from "../../config/config";
import Loading from "../Loading/Loading.tsx";

const initialState: UserType = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  initials: "",
  color: "",
  _id: "",
};

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [inputData, setinputData] = useState(initialState);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isLoading = useSelector(
    (state: any) => state.loadingReducers.isLoading
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setEmailError(false);
    setPasswordError(false);

    dispatch(startLoading(true));
    try {
      const res = await API.post(
        `/user/${isSignup ? "signup" : "signin"}`,
        inputData
      );
      const data = res.data.data.user;
      const token = res.data.data.token;

      dispatch(auth({ ...data, token }));
      navigate("/products");
    } catch (error: any) {
      const errorMessage =
        error.response.data.message || "An error occurred. Please try again.";
      setErrorMessage(errorMessage);

      if (
        errorMessage === "Email already exists" ||
        errorMessage === "Invalid email address"
      ) {
        setEmailError(true);
      } else if (errorMessage === "Password does not match") {
        setPasswordError(true);
      } else {
        setPasswordError(true);
        setEmailError(true);
      }

      console.log("Error", error);
    } finally {
      dispatch(endLoading(false));
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setinputData({ ...inputData, [e.target.name]: e.target.value });
    setEmailError(false);
    setPasswordError(false);
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleSwitch = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AuthContainer>
      <Box>
        <Typography variant="h5"> Welcome to InventWise!</Typography>
        <Typography variant="h5">Sign in to start...</Typography>
      </Box>
      <StyledPaper>
        <Avatar>
          <LockOutlined />
        </Avatar>
        <StyledTypography variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </StyledTypography>
        <StyledForm onSubmit={handleSubmit}>
          {isSignup && (
            <div>
              <StyledTextField
                name="firstName"
                label="First Name"
                variant="outlined"
                required
                onChange={handleInputChange}
              />
              <StyledTextField
                name="lastName"
                label="Last Name"
                variant="outlined"
                required
                onChange={handleInputChange}
              />
            </div>
          )}
          <StyledTextField
            name="email"
            label="Email"
            variant="outlined"
            required
            onChange={handleInputChange}
            error={emailError}
            id={emailError ? "outlined-error-helper-text" : "outlined-required"}
            helperText={emailError && !passwordError ? errorMessage : ""}
          />
          <FormControl>
            <StyledTextField
              name="password"
              label="Password"
              variant="outlined"
              required
              onChange={handleInputChange}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={passwordError}
              id={
                passwordError
                  ? "outlined-error-helper-text"
                  : "outlined-required"
              }
              helperText={
                !isSignup && passwordError && emailError ? errorMessage : ""
              }
            />
          </FormControl>
          {isSignup && (
            <StyledTextField
              name="confirmPassword"
              label="Confirm Password"
              variant="outlined"
              type="password"
              required
              onChange={handleInputChange}
              error={passwordError}
              id={
                passwordError
                  ? "outlined-error-helper-text"
                  : "outlined-required"
              }
              helperText={
                passwordError || (passwordError && emailError)
                  ? errorMessage
                  : ""
              }
            />
          )}
          <StyledButton variant="contained" type="submit">
            {isSignup ? "Sign up" : "Sign in"}
          </StyledButton>
          <StyledLink onClick={handleSwitch}>
            {isSignup
              ? "Already have an account? Sign in!"
              : "Don't have an account? Sign up!"}
          </StyledLink>
        </StyledForm>
      </StyledPaper>
    </AuthContainer>
  );
};

export default Auth;
