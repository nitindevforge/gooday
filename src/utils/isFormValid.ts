import { FormikErrors, FormikValues } from "formik";

export const isFormValid = (
  errors: FormikErrors<FormikValues>,
  values: FormikValues,
  ignore?: string[]
) => {
  values = JSON.parse(JSON.stringify(values));
  ignore?.forEach((el) => {
    delete values?.[el];
  });
  return !(
    Object.keys(errors).length === 0 &&
    Object.values(values)?.filter((el) => el)?.length ===
      Object.keys(values)?.length
  );
};
