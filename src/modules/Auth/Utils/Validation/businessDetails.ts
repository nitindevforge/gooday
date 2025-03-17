import * as Yup from 'yup';

// Schema for time object
const timeSchema = Yup.object().shape({
  openAt: Yup.string().required('Open time is required'),
  closeAt: Yup.string().required('Close time is required'),
});

// Schema for each day
const daySchema = Yup.object().shape({
  time: Yup.array()
    .when('isClose', {
      is: (value: boolean) => value === true,
      then: (s) => s.required('Time is required'),
      otherwise: (schema) => schema.of(timeSchema),
    }),
  isClose: Yup.boolean().required('Close flag is required'),
});

// Schema for the entire timing object
export const businessDetailsValidationSchema = Yup.object().shape({
  timing: Yup.array().of(daySchema).required('Time is required')
});
