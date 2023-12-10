/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete } from "@mui/material";
import { Field, ErrorMessage } from "formik";
import { TextField } from "@mui/material/";

const FormSelect = (props: any) => {
  const { name, label, options } = props;

  return (
    <Field name={name}>
      {({ form, meta, field }: any) => {
        const { setFieldValue, setFieldTouched } = form;
        const { touched, error } = meta;
        const handleBlur = () => {
          setFieldTouched(name, true);
        };

        // const isOptionEqualToValue = (option, value) => option.value === value.value;
        return (
          <Autocomplete
            options={options}
            // defaultValue={field.value}
            value={field.value}
            // {...field}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            onChange={(event: any, value: any) => {
              // if (typeof (value) !== "object") {
              //     setFieldValue(name, null);
              // }

              setFieldValue(name, value);
            }}
            onBlur={handleBlur}
            renderInput={(params) => (
              <TextField
                {...params}
                name={name}
                label={label}
                variant="outlined"
                fullWidth
                error={touched && !!error}
                helperText={<ErrorMessage name={name} />}
              />
            )}
          />
        );
      }}
    </Field>
  );
};

export default FormSelect;
