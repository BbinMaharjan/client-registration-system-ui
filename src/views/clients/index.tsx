/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// project imports
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Grid, Stack, Typography, useTheme } from "@mui/material";
import { debounce } from "lodash";
import { Fragment, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import AnimateButton from "../../components/extended/animateButton";
import SearchInput from "../../components/search-input";
import DataTable from "../../components/table";
import * as routeUrl from "../../routes/routeUrl";
import { useGetClient } from "../../services";
import { TableParamsType } from "../../types/commonTypes";
import { InitialGlobalValues } from "../../utils/constants/initialValues";
import { ClientsTableHeader } from "./clientsTableHeader";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { AppServices } from "../../services/services";
import { toast } from "react-toastify";
import { handleDownloadFile } from "../../utils/globalUtils";

const initialValues = {
  searchKeyword: "",
  productId: "",
};
const Clients = (): React.JSX.Element => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [initialData, setInitialData] = useState({
    ...initialValues,
  });
  const [tableInfo, setTableInfo] = useState<TableParamsType>(
    InitialGlobalValues.tableParams
  );

  const { data: ClientData, status: ClientDataStatus } = useGetClient(
    initialData?.searchKeyword,
    tableInfo?.sortOrder,
    initialData?.productId,
    tableInfo?.sorting,
    tableInfo?.skipCount,
    tableInfo?.maxResultCount
  );

  const onSearchKeyword = (event: any): void => {
    setInitialData({
      ...initialData,
      searchKeyword: event.target.value,
    });
  };

  const debouncedSearchChangeHandler = useMemo(
    () => debounce(onSearchKeyword, 500),
    []
  );

  const handleAdd = (): void => {
    navigate(`${routeUrl?.CREATE_CLIENT_FORM.url}`, {
      state: { formStatus: "Create" },
    });
  };

  const handleExport = async (): Promise<void> => {
    await AppServices.postClientExport()
      .then((response: any) => {
        handleDownloadFile(
          `${response?.data?.name}.xlsx`,
          response?.data?.content
        );
        toast.success(`Export Excel Successful`);
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.error?.message || `Something went wrong`
        );
      });
  };

  return (
    <Fragment>
      <Box>
        <Grid container spacing={2} mb={1} alignItems={"center"}>
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                color={theme.palette.primary.main}
                variant="h1"
                fontSize={25}
              >
                {routeUrl?.CLIENT.name}
              </Typography>
              <Stack gap={2} sx={{ py: "1rem" }} direction="row">
                <AnimateButton>
                  <Button
                    size="medium"
                    type="button"
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={handleExport}
                    startIcon={<CloudDownloadIcon />}
                  >
                    Export
                  </Button>
                </AnimateButton>
                <AnimateButton>
                  <Button
                    size="medium"
                    type="button"
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={handleAdd}
                    startIcon={<AddIcon />}
                  >
                    Add
                  </Button>
                </AnimateButton>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Stack
          gap={2}
          sx={{ py: "1rem" }}
          direction="row"
          justifyContent="space-between"
          alignItems="start"
        >
          <SearchInput
            width={"100%"}
            name="searchKeyword"
            placeholder="Search"
            label="Search"
            onChange={debouncedSearchChangeHandler}
          />{" "}
        </Stack>
      </Box>
      <DataTable
        data={ClientData?.items ?? []}
        count={Number(ClientData?.totalCount)}
        columns={ClientsTableHeader(tableInfo)}
        tableInfo={tableInfo}
        loading={ClientDataStatus || "success"}
        setTableInfo={setTableInfo}
      />
    </Fragment>
  );
};

export default Clients;
