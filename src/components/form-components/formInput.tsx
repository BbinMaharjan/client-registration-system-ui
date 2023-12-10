/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from "@mui/material/";
import { Field, ErrorMessage } from "formik";

const FormInput: any = (props: any) => {
  const { name, max, onKeyDown, autoFocus, ...rest } = props;

  return (
    <Field name={name}>
      {({ field, meta }: any) => {
        return (
          <TextField
            autoFocus={!!autoFocus}
            {...field}
            {...rest}
            fullWidth
            autoComplete="off"
            error={meta.touched && !!meta.error}
            helperText={<ErrorMessage name={name} />}
            inputProps={{ maxLength: max ?? 100 }}
            onKeyDown={onKeyDown}
          />
        );
      }}
    </Field>
  );
};

export default FormInput;
