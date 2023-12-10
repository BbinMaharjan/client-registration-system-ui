/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

interface SearchType {
  name: string;
  placeholder?: string;
  value?: string;
  label?: string;
  width?: string;
  max?: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = React.memo(
  ({
    name,
    placeholder,
    onChange,
    label,
    value,
    width,
    max,
  }: SearchType): React.JSX.Element => {
    return (
      <TextField
        fullWidth
        size="small"
        id={name}
        label={label}
        name={name}
        value={value}
        placeholder={placeholder ?? "Search....."}
        autoComplete="off"
        onChange={(event: any) => {
          onChange(event);
        }}
        style={{ width: width ?? 200 }}
        variant="outlined"
        inputProps={{ max: max ?? 100 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    );
  }
);

export default SearchInput;
