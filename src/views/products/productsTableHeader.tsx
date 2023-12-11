/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../components/delete-modal";
import TableAction from "../../components/table/tableAction";
import useBoolean from "../../hooks/useBoolean";
import * as routeUrl from "../../routes/routeUrl";
import { useQueryClient } from "react-query";
import { AppServices } from "../../services/services";
import { toast } from "react-toastify";

export const ProductsTableHeader = (tableInfo: any) => {
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
        const {
          value: isConfirmOpen,
          setFalse: closeConfirmModal,
          setTrue: openConfirmModal,
        } = useBoolean(false);

        const onEdit = (): void => {
          navigate(`${routeUrl?.UPDATE_PRODUCTS_FORM.url}`, {
            state: {
              record: row?.original,
              formStatus: "Update",
            },
          });
        };

        const onDelete = async () => {
          await AppServices.deleteProduct(row?.original?.id)
            .then((response: any) => {
              toast.success(`Delete Successful`);
              queryClient.invalidateQueries("getProductData");
            })
            .catch((error) => {
              toast.error(
                error?.response?.data?.error?.message || `Something went wrong`
              );
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
