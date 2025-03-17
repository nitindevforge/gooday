import * as Yup from "yup";

export const createEventValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title required"),
  startDate: Yup.string().required("Start date required"),
  from: Yup.string().required("From required"),
  to: Yup.string().required("To required"),
  repeat: Yup.string().required("Repeat required"),
});
