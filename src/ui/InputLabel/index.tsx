import React from "react";
import Typography from "../Typography";
import { InputLabelProps } from "./type";

const InputLabel: React.FC<InputLabelProps> = ({ label }) => {
  return (
    <Typography className="mb-2" variant="base" weight="regular">
      {label}
    </Typography>
  );
};

export default InputLabel;
