import {
  BusinessVenueTimingPayload,
  BusinessTiming,
} from "@gooday_corp/gooday-api-client";
import { FormikProps } from "formik";

export type BusinessDetailsFormProps = {
  form: FormikProps<BusinessDetailsFormState>;
  isLoading: boolean;
  onSubmitDetails?: (payload: BusinessVenueTimingPayload) => void;
};

type TimeEntry = {
  openAt: string;
  closeAt: string;
};

export type TimingEntry = {
  title: string;
  close?: boolean;
  time: TimeEntry[];
};

export type BusinessDetailsFormState = {
  timing: BusinessTiming[];
};
