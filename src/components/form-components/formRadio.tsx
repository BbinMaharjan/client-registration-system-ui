/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material/";
import { ErrorMessage, Field } from "formik";
const FormRadio: any = (props: any) => {
  const { name, label, required = false, options } = props;
  return (
    <Field name={name}>
      {({ field, meta }: any) => {
        return (
          <FormControl
            component="fieldset"
            error={meta.touched && !!meta.error}
            required={required}
          >
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup
              row
              name={name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            >
              {options?.map((option: any) => {
                return (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                );
              })}
            </RadioGroup>
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

export default FormRadio;
