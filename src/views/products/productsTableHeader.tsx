/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack } from "@mui/material";
import TableAction from "../../components/table/tableAction";
import { useNavigate } from "react-router-dom";
import * as routeUrl from "../../routes/routeUrl";

export const ProductsTableHeader = (tableInfo: any) => {
  const navigate = useNavigate();
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
      Header: "Product Name",
      accessor: "name",
    },
    {
      Header: "Manufacturer",
      accessor: "manufacturer",
    },
    {
      Header: "Model",
      accessor: "model",
    },
    {
      Header: "Price",
      accessor: "price",
      Cell: ({ row }: any) => {
        return (
          <Stack direction="row" spacing={1}>
            $ {row?.original?.price}
          </Stack>
        );
      },
    },

    {
      Header: "Product Category",
      accessor: "productCategoryName",
    },
    {
      Header: "Action",
      Cell: ({ row }: any) => {
        const onEdit = (): void => {
          navigate(`${routeUrl?.UPDATE_PRODUCTS_FORM.url}`, {
            state: {
              record: row?.original,
              formStatus: "Update",
            },
          });
        };
        return <TableAction onEdit={onEdit} />;
      },
    },
  ];
};
