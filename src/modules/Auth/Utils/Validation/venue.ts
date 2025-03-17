import * as Yup from "yup";

export const venueValidationSchema = Yup.object().shape({
  priceRange: Yup.string().required("Price range required"),
  location: Yup.string().required("Location required"),
  // coverPhoto: Yup.string().required("Cover required"),
  numberOfEmployee: Yup.string().required("Number employee required"),
});
