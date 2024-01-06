/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { Form, Formik } from "formik";
import { isEmpty } from "lodash";
import { Fragment } from "react";
import { useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import AnimateButton from "../../components/extended/animateButton";
import FormControl from "../../components/form-components/formControl";
import FormLoader from "../../components/formLoader";
import * as routeUrl from "../../routes/routeUrl";
import { useGetAllClient, useGetAllProduct } from "../../services";
import { AppServices } from "../../services/services";
import { TRANSITIONS_VALIDATION } from "../../utils/validations/validation";

const initialValues = {
  clientId: null,
  productIdId: null,
  quantity: undefined,
  sellPrice: undefined,
};

const TransitionsForm = (): React.JSX.Element => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location: any = useLocation();

  const record = location?.state?.record;
  const isEdit = location?.state?.formStatus === "Update";

  const { data: Clients, isLoading } = useGetAllClient();

  const { data: ProductsList } = useGetAllProduct();

  const ProductsListOption =
    ProductsList?.items?.map((item: any) => {
      return {
        label: item?.name,
        value: item?.id,
      };
    }) ?? [];

  const ClientsOption =
    Clients?.map((item: any) => {
      return {
        label: `${!isEmpty(item?.firstName) ? String(item?.firstName) : ""} ${
          !isEmpty(item?.middleName) ? String(item?.middleName) : ""
        } ${!isEmpty(item?.lastName) ? String(item?.lastName) : ""}`,
        value: item?.id,
      };
    }) ?? [];

  const handleSubmit = async (values: any): Promise<void> => {
    const payload = {
      ...values,
      clientId: values?.clientId?.value,
      productIdId: values?.productIdId?.value,
    };
    if (isEdit) {
      // await AppServices.putTransition(record?.id, payload)
      //   .then((response: any) => {
      //     toast.success(`${response?.data?.message}`);
      //     queryClient.invalidateQueries("getProductData");
      //     navigate(-1);
      //   })
      //   .catch((error) => {
      //     toast.error(
      //       error?.response?.data?.error?.message || `Something went wrong`
      //     );
      //   });
    } else {
      await AppServices.postTransitions(payload)
        .then((response: any) => {
          toast.success(`${response?.data?.message}`);
          queryClient.invalidateQueries("getTransitionData");
          navigate(-1);
        })
        .catch((error) => {
          toast.error(
            error?.response?.data?.error?.message || `Something went wrong`
          );
        });
    }
  };

  function handleCancel(): void {
    navigate(`${routeUrl?.TRANSITIONS.url}`);
  }

  return (
    <Fragment>
      <Box>
        <Grid container spacing={2} mb={1} alignItems={"center"}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-haspopup="true"
                onClick={() => {
                  handleCancel();
                }}
              >
                <ArrowBackIcon sx={{ color: theme.palette.primary.main }} />
              </IconButton>
              <Typography
                color={theme.palette.primary.main}
                variant="h1"
                fontSize={25}
              >
                {`${location?.state?.formStatus} ${routeUrl?.CREATE_TRANSITIONS_FORM.name}`}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Card sx={{ mb: "1rem" }} elevation={1}>
        <CardContent sx={{ p: 3 }}>
          <Box>
            {isLoading ? (
              <FormLoader />
            ) : (
              <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={handleSubmit}
                // validationSchema={TRANSITIONS_VALIDATION}
              >
                {(formikProps) => (
                  <Form noValidate>
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      <Grid item xs={2} sm={4} md={4}>
                        <FormControl
                          control="select"
                          name="clientId"
                          label="Client"
                          variant="outlined"
                          required
                          options={ClientsOption}
                        />
                      </Grid>
                      <Grid item xs={2} sm={4} md={4}>
                        <FormControl
                          control="select"
                          name="productIdId"
                          label="Product"
                          variant="outlined"
                          required
                          options={ProductsListOption}
                        />
                      </Grid>
                      <Grid item xs={2} sm={4} md={4}>
                        <FormControl
                          control="input"
                          name="quantity"
                          label="Quantity"
                          variant="outlined"
                          type="number"
                          max={8}
                          required
                        />
                      </Grid>

                      <Grid item xs={2} sm={4} md={4}>
                        <FormControl
                          control="input"
                          name="sellPrice"
                          label="Sell Price"
                          variant="outlined"
                          type="number"
                          max={8}
                          required
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      <Grid item xs={12} sm={4} md={8}></Grid>
                      <Grid item xs={12} sm={4} md={2}>
                        <AnimateButton>
                          <Button
                            fullWidth
                            size="large"
                            type="button"
                            variant="outlined"
                            onClick={handleCancel}
                            sx={{ mt: 2, color: theme.palette.primary.main }}
                            startIcon={<CloseIcon />}
                          >
                            Cancel
                          </Button>
                        </AnimateButton>
                      </Grid>
                      <Grid item xs={12} sm={4} md={2}>
                        <AnimateButton>
                          <LoadingButton
                            fullWidth
                            disableElevation
                            size="large"
                            type="submit"
                            variant="contained"
                            color="secondary"
                            sx={{ mt: 2 }}
                            startIcon={<SaveIcon />}
                            loading={formikProps.isSubmitting}
                            loadingPosition="start"
                          >
                            Submit
                          </LoadingButton>
                        </AnimateButton>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            )}
          </Box>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default TransitionsForm;
