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
import { Fragment } from "react";
import { useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router";
import AnimateButton from "../../components/extended/animateButton";
import FormControl from "../../components/form-components/formControl";
import FormLoader from "../../components/formLoader";
import * as routeUrl from "../../routes/routeUrl";
import { useGetAllProduct, useGetClientById } from "../../services";
import { AppServices } from "../../services/services";
import { CLIENT_VALIDATION } from "../../utils/validations/validation";
import { toast } from "react-toastify";

const initialValues = {
  firstName: "",
  middleName: "",
  lastName: "",
  address: "",
  phoneNumber: "",
  email: "",
};

const ClientsForm = (): React.JSX.Element => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location: any = useLocation();

  const record = location?.state?.record;
  const isEdit = location?.state?.formStatus === "Update";

  const { data: ClientDetail, isLoading } = useGetClientById(record?.id);

  const EditData = {
    firstName: ClientDetail?.firstName,
    middleName: ClientDetail?.middleName,
    lastName: ClientDetail?.lastName,
    address: ClientDetail?.address,
    phoneNumber: ClientDetail?.phoneNumber,
    email: ClientDetail?.email,
  };

  const handleSubmit = async (values: any): Promise<void> => {
    const payload = {
      ...values,
      phoneNumber: String(values?.phoneNumber),
    };
    if (isEdit) {
      await AppServices.putClient(record?.id, payload)
        .then((response: any) => {
          toast.success(`${response?.data?.message}`);
          queryClient.invalidateQueries("getClientData");
          navigate(-1);
        })
        .catch((error) => {
          toast.error(
            error?.response?.data?.error?.message || `Something went wrong`
          );
        });
    } else {
      await AppServices.postClient(payload)
        .then((response: any) => {
          toast.success(`${response?.data?.message}`);
          queryClient.invalidateQueries("getClientData");
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
    navigate(`${routeUrl?.CLIENT.url}`);
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
                {`${location?.state?.formStatus} ${routeUrl?.CREATE_CLIENT_FORM.name}`}
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
                initialValues={isEdit ? EditData : initialValues}
                onSubmit={handleSubmit}
                validationSchema={CLIENT_VALIDATION}
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
                          control="input"
                          name="firstName"
                          label="First Name"
                          variant="outlined"
                          required
                        />
                      </Grid>
                      <Grid item xs={2} sm={4} md={4}>
                        <FormControl
                          control="input"
                          name="middleName"
                          label="Middle Name"
                          variant="outlined"
                          required={false}
                        />
                      </Grid>
                      <Grid item xs={2} sm={4} md={4}>
                        <FormControl
                          control="input"
                          name="lastName"
                          label="Last Name"
                          variant="outlined"
                          required
                        />
                      </Grid>

                      <Grid item xs={2} sm={4} md={4}>
                        <FormControl
                          control="input"
                          name="address"
                          label="Address"
                          variant="outlined"
                          required
                        />
                      </Grid>

                      <Grid item xs={2} sm={4} md={4}>
                        <FormControl
                          control="input"
                          name="phoneNumber"
                          label="Phone Number"
                          variant="outlined"
                          required
                          type="number"
                          max={16}
                        />
                      </Grid>

                      <Grid item xs={2} sm={4} md={4}>
                        <FormControl
                          control="input"
                          name="email"
                          label="Email"
                          variant="outlined"
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

export default ClientsForm;
