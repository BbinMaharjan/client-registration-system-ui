// material-ui
import {
  Avatar,
  Box,
  CssBaseline,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Logo from "../../components/Logo";
import MainCard from "../../components/cards/mainCard";
import backgroundImage from "../../assets/images/Background.jpg"; // Replace with the actual path to your image

// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const AuthWrapper = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  minHeight: "100vh",
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover", // Adjust this property as needed
  backgroundPosition: "center", // Adjust this property as needed
  /* You can add more background-related properties as needed */
}));
const MainAuthWrapper = ({ title, children, ...other }: any) => {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Logo width="200" height="100" />
          <Typography
            component="h1"
            variant="h5"
            sx={{ mt: "4rem", mb: "2rem" }}
          >
            {title}
          </Typography>
          {children}
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );
};

export default MainAuthWrapper;
