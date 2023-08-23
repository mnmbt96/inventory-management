import { CircularProgress, Paper } from "@mui/material";

const Loading = () => {
  return (
    <Paper
      elevation={6}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        borderRadius: "15px",
        height: "100vh",
      }}
    >
      <CircularProgress size="7em" />
    </Paper>
  );
};

export default Loading;
