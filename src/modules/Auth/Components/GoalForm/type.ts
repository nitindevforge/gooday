
import {FormikProps} from 'formik';

export type GoalFormProps = {
  form: FormikProps<GoalFormState>;
  isLoading:boolean
}
export type GoalFormState = {
  goal: string[];
  other: string
};
