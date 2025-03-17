import { useFormik } from "formik";
import { VenueState, venueValidationSchema } from "@app/modules";

export const useVenue = () => {
  const form = useFormik<VenueState>({
    initialValues: {
      coverPhoto: "",
      priceRange: "",
      location: "",
      numberOfEmployee: '',
    },

    validationSchema: venueValidationSchema,
    onSubmit: (values) => {
      form?.resetForm();
    },
  });

  return { form };
};
