import { BusinessVenueDTO, LocationDTO } from "@gooday_corp/gooday-api-client";
import { FormikProps } from "formik";

export type BusinessDetailsInfoFormProps = {
  form: FormikProps<BusinessDetailsInfoFormState>;
  isLoading: boolean;
};

export type BusinessDetailsInfoFormState = {
  name: "";
  businessCountry: string;
  businessID: string;
  businessIDVerified: boolean;
  businessType: string;
  businessTypeLabel?: string;
  businessCategory: string;
  businessCategoryLabel?: string;
  venues: BusinessVenueDTO[];
};

export type VenueState = {
  coverPhoto?: string;
  priceRange?: string;
  numberOfEmployee?: string;
  location?: string;
  // coordinates?: LocationDTO
};
