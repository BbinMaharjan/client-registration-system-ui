/* eslint-disable @typescript-eslint/no-explicit-any */

import FormInput from "./formInput";
import FormSelect from "./formSelect";

const FormControl: any = (props: any) => {
  const { control, ...rest } = props;

  switch (control) {
    case "input":
      return <FormInput {...rest} />;

    case "select":
      return <FormSelect {...rest} />;
  }
};

export default FormControl;
