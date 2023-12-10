import React from "react";
import type { OptionType } from "../../types/commonTypes";
import { Switch } from "@mui/material";

interface SwitchProps {
  checked?: boolean;
  onChange?: () => void;
}

const SwitchComponent: React.FC<SwitchProps> = React.memo(
  ({ checked, onChange, ...reset }): React.JSX.Element => {
    return (
      <>
        <Switch onChange={onChange} checked={checked} />
      </>
    );
  }
);
export default SwitchComponent;
