/* eslint-disable */
// regular expression to match only letters and Number

import dayjs from "dayjs";

export const Today = dayjs().startOf("day").format("dddd DD MMMM, YYYY");

export const handleMouseDownPassword = (event: any) => {
  event.preventDefault();
};

export const handleDownloadFile = (fileName: string, fileContent: string) => {
  const fileArray = fileName.split(".");
  const fileExtensionType = fileArray[fileArray.length - 1];

  const fileExtension = fileExtensionType;

  const aElement = document.createElement("a");
  let downloadLink = `data:application/${fileExtension};base64,` + fileContent;
  aElement.setAttribute("download", fileName);
  aElement.setAttribute("href", downloadLink);
  aElement.click();
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
