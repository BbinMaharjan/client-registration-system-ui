/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack } from "@mui/material";
import TableAction from "../../components/table/tableAction";
import { useNavigate } from "react-router-dom";
import * as routeUrl from "../../routes/routeUrl";
import { isEmpty } from "lodash";

export const ClientsTableHeader = (tableInfo: any) => {
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
      Header: "Full Name",
      accessor: "name",
      Cell: ({ row }: any) => {
        return (
          <Stack direction="row" spacing={1}>
            {`${
              !isEmpty(row?.original.firstName)
                ? String(row?.original.firstName)
                : ""
            } ${
              !isEmpty(row?.original.middleName)
                ? String(row?.original.middleName)
                : ""
            } ${
              !isEmpty(row?.original.lastName)
                ? String(row?.original.lastName)
                : ""
            }`}
          </Stack>
        );
      },
    },
    {
      Header: "Address",
      accessor: "address",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Phone Number",
      accessor: "phoneNumber",
    },
    {
      Header: "Product Name",
      accessor: "productName",
    },
    {
      Header: "Action",
      Cell: ({ row }: any) => {
        const onEdit = (): void => {
          navigate(`${routeUrl?.UPDATE_CLIENT_FORM.url}`, {
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
