// material-ui
import { Grid, Typography, useTheme } from "@mui/material";

// project imports
import { gridSpacing } from "../../store/constant";
import { Today } from "../../utils/globalUtils";
import * as storage from "../../utils/storage";
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const theme = useTheme();
  const userDetails = storage.get("user");

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography
              color={theme.palette.primary.main}
              gutterBottom
              variant={"h1"}
              fontSize={30}
            >
              Hello, {userDetails?.fullName}
            </Typography>

            <Typography
              color={theme.palette.primary.main}
              gutterBottom
              variant={"h6"}
              fontSize={20}
            >
              Welcome to Client Registration System
            </Typography>

            <Typography
              color={theme.palette.primary.main}
              gutterBottom
              variant={"body1"}
            >
              {Today}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
