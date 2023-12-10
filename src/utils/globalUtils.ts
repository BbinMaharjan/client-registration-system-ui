/* eslint-disable */
// regular expression to match only letters and Number

import dayjs from "dayjs";

export const Today = dayjs().startOf("day").format("dddd DD MMMM, YYYY");

export const handleMouseDownPassword = (event: any) => {
  event.preventDefault();
};

export const FirstTextUpperCase = (text: string | any) => {
  return text?.charAt(0)?.toUpperCase() + text?.slice(1);
};

export const OptionsDropdown = (data: any) => {
  const responseData = data?.map((item: any) => {
    return {
      label: item?.productCategoryName,
      value: item?.productCategoryId,
    };
  });
  return responseData ?? [];
};
