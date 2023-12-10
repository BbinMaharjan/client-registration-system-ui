/* eslint-disable @typescript-eslint/no-explicit-any */

import FormInput from "./formInput";
import FormMultipleSelect from "./formMultipleSelect";
import FormRadio from "./formRadio";
import FormSelect from "./formSelect";
import FormSwitch from "./formSwitch";

const FormControl: any = (props: any) => {
  const { control, ...rest } = props;

  switch (control) {
    case "input":
      return <FormInput {...rest} />;

    case "radio":
      return <FormRadio {...rest} />;

    case "multiSelect":
      return <FormMultipleSelect {...rest} />;

    case "select":
      return <FormSelect {...rest} />;

    case "switch":
      return <FormSwitch {...rest} />;
  }
};

export default FormControl;
