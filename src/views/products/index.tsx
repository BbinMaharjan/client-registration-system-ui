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
import { useGetProduct } from "../../services";
import { TableParamsType } from "../../types/commonTypes";
import { InitialGlobalValues } from "../../utils/constants/initialValues";
import { ProductsTableHeader } from "./productsTableHeader";

const initialValues = {
  searchKeyword: "",
  productCategoryId: "",
};
const Products = (): React.JSX.Element => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [initialData, setInitialData] = useState({
    ...initialValues,
  });
  const [tableInfo, setTableInfo] = useState<TableParamsType>(
    InitialGlobalValues.tableParams
  );

  const { data: ProductData, status: ProductDataStatus } = useGetProduct(
    initialData?.searchKeyword,
    tableInfo?.sortOrder,
    initialData?.productCategoryId,
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
    navigate(`${routeUrl?.CREATE_PRODUCTS_FORM.url}`, {
      state: { formStatus: "Create" },
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
                {routeUrl?.PRODUCTS.name}
              </Typography>
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
          alignItems="center"
        >
          <SearchInput
            width={"30%"}
            name="searchKeyword"
            placeholder="Search"
            label="Search"
            onChange={debouncedSearchChangeHandler}
          />
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
              Add Product
            </Button>
          </AnimateButton>
        </Stack>
      </Box>

      <DataTable
        data={ProductData?.items ?? []}
        count={Number(ProductData?.totalCount)}
        columns={ProductsTableHeader(tableInfo)}
        tableInfo={tableInfo}
        loading={ProductDataStatus || "success"}
        setTableInfo={setTableInfo}
      />
    </Fragment>
  );
};

export default Products;
