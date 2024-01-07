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
import html2pdf from "html2pdf.js";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

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
              toast.error(
                error?.response?.data?.error?.message || `Something went wrong`
              );
            });
        };

        const downloadPdf = () => {
          // Convert JSON to HTML (format as needed)
          const htmlContent = `
          <div>
          <div><h2>Client Registration System</h2></div>
          <hr/>
          <div>
          <div style="display: flex; flex-direction: row; align-items: center; "><h5>Full Name:</h5> <span style="margin-left:1rem">${
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
          }</span> </div>
          <div style="display: flex; flex-direction: row; align-items: center; "><h5>Address:</h5> <span style="margin-left:1rem">${
            row?.original.address
          }</span> </div>
          <div style="display: flex; flex-direction: row; align-items: center; "><h5>Email:</h5> <span style="margin-left:1rem">${
            row?.original.email
          }</span> </div>
          <div style="display: flex; flex-direction: row; align-items: center; "><h5>Phone Number:</h5> <span style="margin-left:1rem">${
            row?.original.phoneNumber
          }</span> </div>
       
          </div>
          </div>
          `;

          // Create PDF
          html2pdf(htmlContent, {
            margin: 10,
            filename: "ClientDetail.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
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
              optionAction={true}
              optionTitle="Download PDF"
              onOptionClick={downloadPdf}
              optionActionIcon={<PictureAsPdfIcon />}
            />
          </>
        );
      },
    },
  ];
};
