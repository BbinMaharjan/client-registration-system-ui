import { TablePagination } from "@mui/material";
import { ElementType, useState } from "react";
import { TableParamsType } from "../../types/commonTypes";
import { PAGE_SIZE_OPTION } from "../../utils/constants/common";

interface Props {
  component: ElementType<any>;
  count: number;
  tableInfo?: TableParamsType;
  setTableInfo?: any;
}

const CustomPagination = (props: Props) => {
  const { component, count, tableInfo, setTableInfo } = props;
  const [selectedPage, setSelectedPage] = useState(0);

  const onPageChange = (event: any, page: number) => {
    setSelectedPage(page);
    setTableInfo({
      ...tableInfo,
      skipCount: Number(page) * 10,
      pageNo: page + 1,
    });
  };

  const onRowsPerPageChange = (event: any) => {
    setTableInfo({
      ...tableInfo,
      pageNo: 1,
      skipCount: selectedPage,
      maxResultCount: event.target.value,
    });
  };

  return (
    <TablePagination
      component={component}
      count={count}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      page={Number(tableInfo?.pageNo) - 1}
      rowsPerPage={Number(tableInfo?.maxResultCount)}
      rowsPerPageOptions={PAGE_SIZE_OPTION}
      sx={{ fontSize: "1.4rem" }} // Adding textAlign: 'left'
    />
  );
};

export default CustomPagination;
