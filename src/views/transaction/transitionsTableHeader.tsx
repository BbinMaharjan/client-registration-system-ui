/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack } from "@mui/material";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

export const TransitionsTableHeader = (tableInfo: any) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return [
    {
      Header: "S.N",
      accessor: "key",
      Cell: ({ row }: any) => {
        return (
          <Stack direction="row" spacing={1}>
            {(Number(tableInfo?.pageNo) - 1) *
              Number(tableInfo?.maxResultCount) +
              (row?.index + 1)}
          </Stack>
        );
      },
    },

    {
      Header: "Client Name",
      accessor: "clientName",
    },
    {
      Header: "Product Name",
      accessor: "productName",
    },
    {
      Header: "Product Category Name",
      accessor: "productCategoryName",
    },
    {
      Header: "Quantity",
      accessor: "quantity",
    },
    {
      Header: "Sell Price",
      accessor: "sellPrice",
      Cell: ({ row }: any) => {
        return (
          <Stack direction="row" spacing={1}>
            $ {row?.original?.sellPrice}
          </Stack>
        );
      },
    },
  ];
};
