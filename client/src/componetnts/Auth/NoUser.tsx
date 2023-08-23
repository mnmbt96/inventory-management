import { Typography, Button } from "@mui/material";

const NoUser = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h6" marginBottom={1}>
        Cannot find signin user...
      </Typography>
      <Button variant="contained" href="/auth">
        Go to signin
      </Button>
    </div>
  );
};

export default NoUser;
