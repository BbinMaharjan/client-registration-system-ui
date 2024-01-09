// material-ui
import { Stack, Typography, useTheme } from "@mui/material";

// project imports
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const theme = useTheme();

  return (
    <Stack
      display={"flex"}
      direction="row"
      // justifyContent={"center"}
      // alignItems={"center"}
      // sx={{ padding: 25 }}
    >
      <Typography
        color={theme.palette.primary.main}
        gutterBottom
        variant={"h6"}
        fontSize={40}
        style={{ width: "100%" }}
      >
        Welcome To Dashboard
      </Typography>
    </Stack>
  );
};

export default Dashboard;
