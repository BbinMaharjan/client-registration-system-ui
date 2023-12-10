/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete } from "@mui/material";
import { Field, ErrorMessage } from "formik";
import { TextField } from "@mui/material/";

const FormMultipleSelect: any = (props: any) => {
  const { name, options, label } = props;

  return (
    <Field name={name}>
      {({ form, meta, field }: any) => {
        const { setFieldValue, setFieldTouched } = form;
        const { touched, error } = meta;
        const handleBlur = () => {
          setFieldTouched(name, true);
        };
        return (
          <Autocomplete
            multiple={true}
            value={field.value}
            options={options}
            getOptionLabel={(option: any) => option?.label}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            onChange={(event: any, value: any) => {
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

export default FormMultipleSelect;
