import React from "react";
import Typography from "../Typography";
import { ErrorMessageProps } from "./type";

const ErrorMassage: React.FC<ErrorMessageProps> = ({ error, styles }) => {
  return (
    <Typography
      className="mt-1 w-full"
      color="error"
      variant="base"
      weight="regular"
      styles={styles}
    >
      {error}
    </Typography>
  );
};

export default ErrorMassage;
