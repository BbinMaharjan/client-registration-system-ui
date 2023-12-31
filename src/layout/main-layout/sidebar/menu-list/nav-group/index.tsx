/* eslint-disable @typescript-eslint/no-explicit-any */
import PropTypes from "prop-types";

// material-ui
import { Divider, List, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// project imports
import { isEmpty } from "lodash";
import NavCollapse from "../nav-collapse";
import NavItem from "../nav-item";

// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //

const NavGroup = ({ item }: any): React.ReactElement => {
  const theme = useTheme<any>();

  // menu list collapse & items
  const items = item?.children.map((menu: any) => {
    switch (menu?.type) {
      case "collapse":
        return <NavCollapse key={menu.id} menu={menu} level={1} />;
      case "item":
        return <NavItem key={menu.id} item={menu} level={1} />;
      default:
        return (
          <Typography key={menu.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <>
      {!isEmpty(item?.children) && (
        <>
          <List
            subheader={
              item.title != null && (
                <Typography
                  sx={{ ...theme.typography.menuCaption, color: "#ab7a20" }}
                >
                  {item.title}
                  {item.caption != null && (
                    <Typography
                      variant="caption"
                      sx={{ ...theme.typography.subMenuCaption }}
                      display="block"
                      gutterBottom
                    >
                      {item.caption}
                    </Typography>
                  )}
                </Typography>
              )
            }
          >
            {items}
          </List>

          <Divider sx={{ mt: 0.25, mb: 1.25 }} />
        </>
      )}
    </>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object,
};

export default NavGroup;
