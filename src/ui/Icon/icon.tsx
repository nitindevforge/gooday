import React from 'react';
import {IconProps} from './type';
import {Icons} from '@app/components';

export const Icon: React.FC<IconProps> = ({
  fill = 'black',
  stroke = 'white',
  width = 24,
  height = 24,
  outline = true,
  ...props
}) => {
  return (
    <Icons
      stroke={stroke}
      fill={fill}
      width={width}
      height={height}
      outline={outline}
      {...props}
    />
  );
};