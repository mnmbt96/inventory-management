import {
  Container,
  TextField,
  Paper,
  Button,
  styled,
  Typography,
} from "@mui/material";

export const AuthContainer = styled(Container)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-evenly",
  height: "100vh",
  gap: "20px",
});

export const StyledPaper = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
});

export const StyledTypography = styled(Typography)({
  margin: "5px",
});

export const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
});

export const StyledTextField = styled(TextField)({
  margin: "5px",
});

export const StyledButton = styled(Button)({
  margin: "5px",
});

export const StyledLink = styled(Button)({
  textAlign: "right",
});
