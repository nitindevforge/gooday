import { PASSWORD_REGEX } from "../../../../utils/regex";

export const passwordField = (Yup: any, confirmPassword = false) => {
  if (confirmPassword) {
    return Yup.string()
      .oneOf(
        [Yup.ref("password")],
        "Password does not match. Enter new password again here."
      )
      .matches(PASSWORD_REGEX, {
        message: "Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special",
      })
      .required("Confirm password required");
  }
  return Yup.string()
    .matches(PASSWORD_REGEX, {
      message: "Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special",
    })
    .required("Password required");
};
