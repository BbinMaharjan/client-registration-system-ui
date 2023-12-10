/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

// routing
import Routes from "./routes";

// defaultTheme
import themes from "./themes";

// project imports
import NavigationScroll from "./layout/navigationScroll";
import ToastMessage from "./components/toast-message";

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state: any) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
      <ToastMessage />
    </StyledEngineProvider>
  );
};

export default App;
