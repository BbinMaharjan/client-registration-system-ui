/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack } from "@mui/material";
import { isEmpty } from "lodash";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteModal from "../../components/delete-modal";
import TableAction from "../../components/table/tableAction";
import useBoolean from "../../hooks/useBoolean";
import * as routeUrl from "../../routes/routeUrl";
import { AppServices } from "../../services/services";

export const ClientsTableHeader = (tableInfo: any) => {
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
        const {
          value: isConfirmOpen,
          setFalse: closeConfirmModal,
          setTrue: openConfirmModal,
        } = useBoolean(false);

        const onEdit = (): void => {
          navigate(`${routeUrl?.UPDATE_CLIENT_FORM.url}`, {
            state: {
              record: row?.original,
              formStatus: "Update",
            },
          });
        };
        const onDelete = async () => {
          await AppServices.deleteClient(row?.original?.id)
            .then((response: any) => {
              toast.success(`${response?.data?.message}`);
              queryClient.invalidateQueries("getClientData");
            })
            .catch((error) => {
              toast.error(`Something went wrong`);
            });
        };
        return (
          <>
            <DeleteModal
              open={isConfirmOpen}
              onConfirm={() => {
                onDelete();
              }}
              closeModal={() => {
                closeConfirmModal();
              }}
            />
            <TableAction
              onEdit={onEdit}
              onDelete={() => {
                openConfirmModal();
              }}
            />
          </>
        );
      },
    },
  ];
};
