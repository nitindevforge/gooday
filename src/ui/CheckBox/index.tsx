import React from 'react'
import { useTailwind } from 'tailwind-rn';
import { CheckBoxProps } from './type';
import { TouchableOpacity, View } from 'react-native';
import {Icon, Typography} from '@app/ui';
import clsx from 'clsx';

export const CheckBox: React.FC<CheckBoxProps> = ({ size = 'small', left = false, checked, label, onPress, variant = 'filled'}) => {
  const tailwind = useTailwind();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={[
      tailwind('flex-1 flex-row justify-start items-center'),
      {columnGap: 12}
    ]}>
      {
        left && 
        <Typography variant='sm' weight='regular'>{label}</Typography>
      }
      <View style={[tailwind(clsx('flex-row justify-center items-center rounded-sm border-2 border-secondary-100',{
        'bg-secondary-100': variant === 'filled' && checked === true
      })),{width: 14, height: 14}]}>
        {
          checked && 
          
        <Icon name="check" width={7} height={8} fill='white' />
        }
      </View>
      {
        !left &&
        <Typography variant='sm' weight='regular'>{label}</Typography>
      }
    </TouchableOpacity>
  )
}