import { MonthlyViewPrimary, CalendarProps, MonthlyViewSecondary, WeeklyView } from '@app/ui';
import React from 'react'

export const Calendar = <T,>(props: CalendarProps<T>) => {
  const {
    view = 'weekly',
    ...rest
  } = props;

  if (props.view === 'monthly' && props.variant === 'primary') {
    return <MonthlyViewPrimary<T> {...rest} />
  }

  if (props.view === 'monthly' && props.variant === 'secondary') {
    return <MonthlyViewSecondary<T> {...rest} />
  }

  return <WeeklyView<T> {...rest} />
}