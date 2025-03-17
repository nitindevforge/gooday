import * as Yup from "yup";

export const businessDetailsPoliciesValidationSchema = Yup.object().shape({
  policies: Yup.string().required("Policies required"),
  cancellationFee: Yup.number().test(
    "not-between-0-and-1",
    "Minimum $1 required",
    (value) => !(value > 0 && value < 1)
  ),
});
