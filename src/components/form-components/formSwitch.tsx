/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, ErrorMessage } from "formik";
import {
  Switch,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Typography,
} from "@mui/material/";

const FormSwitch = (props: any) => {
  const { name, label } = props;
  return (
    <Field name={name}>
      {({ field, meta }: any) => {
        return (
          <FormControl
            component="fieldset"
            error={meta.touched && !!meta.error}
          >
            <FormControlLabel
              control={<Switch checked={field.value} {...field} />}
              label={
                field.value === true ? (
                  <Typography variant="h5" color="primary">
                    {label}
                  </Typography>
                ) : (
                  <Typography variant="h5">{label}</Typography>
                )
              }
            />
            {meta.touched && meta.error && (
              <FormHelperText>
                <ErrorMessage name={name} />
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
    </Field>
  );
};

export default FormSwitch;
