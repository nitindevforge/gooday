import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useTailwind } from 'tailwind-rn';
import moment from 'moment';
import clsx from 'clsx';
import { Typography } from '@app/ui';
import { WeekDayComponentProps } from './type';

export const WeekDayComponent: React.FC<WeekDayComponentProps> = ({
  isDisabled,
  item,
  isSelected,
  onPress
}) => {
  const tailwind = useTailwind();
  const disabled = isDisabled || typeof onPress !== 'function';

  return (
    <TouchableOpacity
      onPress={() => onPress?.(item)}
      activeOpacity={0.7}
      disabled={disabled}
      style={[tailwind(
        clsx('my-2 items-center justify-start py-2 rounded-xl', {
          'bg-primary-300': isSelected
        })), { width: 61, height: 67, gap: 6 }]}>

      {item ?
        <Typography
          variant='11'
          weight={isSelected ? 'bold' : 'light'}
          color={isSelected ? 'white' : 'gray-200'}>
          {isSelected ? moment(item).format('ddd') : moment(item).format('dd').substring(0, 1)}
        </Typography>
        : null}

      {item ?
        <Typography
          variant='base'
          weight={isSelected ? 'bold' : 'regular'}
          color={isSelected ? 'white' : disabled ? 'gray-500' : 'black'}>
          {moment(item).format('D')}
        </Typography>
        : null}
    </TouchableOpacity>
  )
}