// material-ui
import { useTheme } from "@mui/material/styles";

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 *
 */

import logo from "../assets/images/logo.png";
import { height, width } from "@mui/system";
// ==============================|| LOGO SVG ||============================== //
interface LogoModal {
  width?: string;
  height?: string;
}

const Logo = ({ width, height }: LogoModal) => {
  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     *
     */
    <img src={logo} alt="Berry" width={width ?? "100"} height={height ?? ""} />
  );
};

export default Logo;
