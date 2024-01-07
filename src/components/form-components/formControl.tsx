/* eslint-disable @typescript-eslint/no-explicit-any */

import FormInput from "./formInput";
import FormMultipleSelect from "./formMultipleSelect";
import FormSelect from "./formSelect";

const FormControl: any = (props: any) => {
  const { control, ...rest } = props;

  switch (control) {
    case "input":
      return <FormInput {...rest} />;

    case "select":
      return <FormSelect {...rest} />;
    case "multiSelect":
      return <FormMultipleSelect {...rest} />;
  }
};

export default FormControl;
