import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material/";
import { ErrorMessage, Field } from "formik";

interface FormSelectType {
  name: string;
  label: string;
  options: [];
  required?: boolean;
  defaultValue?: any;
}

const FormMultipleSelect = ({
  name,
  options,
  label,
  required = false,
  defaultValue,
}: FormSelectType): React.JSX.Element => {
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
            // limitTags={10}
            multiple={true}
            value={field.value}
            defaultValue={defaultValue}
            options={options}
            getOptionLabel={(option: any) => option?.label}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            onChange={(event: any, data: any) => {
              setFieldValue(name, data);
            }}
            autoComplete={false}
            autoHighlight
            onBlur={handleBlur}
            renderInput={(params) => (
              <TextField
                {...params}
                name={name}
                label={required ? `${label} *` : `${label}`}
                variant="outlined"
                fullWidth
                error={touched && !!error}
                helperText={<ErrorMessage name={name} />}
                size="small"
              />
            )}
          />
        );
      }}
    </Field>
  );
};

export default FormMultipleSelect;
