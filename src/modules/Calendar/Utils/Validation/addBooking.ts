import * as Yup from "yup";

export const addBookingValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title required"),
  date: Yup.string().required("Date required"),
  people: Yup.number().required("People required"),
  from: Yup.string().required("From required"),
  to: Yup.string().required("To required"),
  venue: Yup.string().required("Venue required"),
  customerName: Yup.string().required("Customer name required"),
  phoneNumber: Yup.number().required("Phone number required"),
  email: Yup.string().email("Invalid email").required("Email required"),
});
