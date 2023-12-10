/* eslint-disable @typescript-eslint/no-explicit-any */
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, MenuItem } from "@mui/material";
import { useState } from "react";
import { StyledMenu } from "./table.styled";

interface TableActionProps {
  onEdit?: () => void;
  editAction?: boolean;
}

const TableAction = ({
  onEdit,
  editAction = true,
}: TableActionProps): React.JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-haspopup="true"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        onClick={(e) => {
          handleClick(e);
        }}
        color="primary"
        disabled={!editAction}
      >
        <MoreVertIcon />
      </IconButton>

      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {editAction && (
          <MenuItem disableRipple onClick={onEdit}>
            <EditIcon />
            Edit
          </MenuItem>
        )}
      </StyledMenu>
    </div>
  );
};
export default TableAction;
