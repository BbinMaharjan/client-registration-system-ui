import * as Yup from "yup";

export const LOGIN_VALIDATION = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .max(100)
    .required("Email is Required"),
  password: Yup.string().max(255).required("Password is Required"),
});

export const PRODUCTS_VALIDATION = Yup.object().shape({
  name: Yup.string().required("Name Required"),
  manufacturer: Yup.string().required("Manufacturer Required"),
  model: Yup.string().required("Model Required"),
  price: Yup.string().required("Price Required"),
  productCategoryId: Yup.object()
    .required("Product Category Required")
    .nullable(),
});

export const CLIENT_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required("First Name Required"),
  lastName: Yup.string().required("Last Name Required"),
  address: Yup.string().required("Address Required"),
  phoneNumber: Yup.string()
    .required("Phone Number Required")
    .matches(/^[0-9]*$/, "Invalid Phone Number"),
  email: Yup.string().required("Email Required").email("Invalid Email"),
  productId: Yup.object().required("Product Required").nullable(),
});
