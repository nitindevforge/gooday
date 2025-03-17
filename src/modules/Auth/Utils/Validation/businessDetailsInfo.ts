import * as Yup from "yup";

export const businessDetailsInfoValidationSchema = Yup.object().shape({
  name: Yup.string().required("Business name required"),
  businessID: Yup.string().required("Business verification required"),
  businessIDVerified: Yup.boolean().required("Press the blue arrow to verify"),
  businessType: Yup.string().required("Business type required"),
  businessCountry: Yup.string().required("Country required"),
  businessCategory: Yup.string().required("Business category required"),
  venues: Yup.array().required("Venue required"),
});
