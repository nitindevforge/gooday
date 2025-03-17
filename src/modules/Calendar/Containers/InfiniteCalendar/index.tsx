import moment, { MomentInput } from "moment";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { InfiniteCalendar } from "../../Components";
import { EventTypes, useInfiniteCalendar } from "../Hooks";
import { Typography } from "@app/ui";

export const InfiniteCalendarContainer: React.FC<{
  onActiveMonthChange: (date: MomentInput) => void;
  eventTypes: EventTypes[];
  initialDate: MomentInput;
  onPress: (date: Date) => void;
}> = ({
  onActiveMonthChange,
  eventTypes,
  onPress,
  initialDate
}) => {
  const tailwind = useTailwind();
  const [activeMonth, setActiveMonth] = useState<MomentInput>(initialDate ?? moment());
  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'Sa', 'Su'];

  const {
    allMonths,
    currentMonthIndex,
    currentRange,
    setCurrentRange,
  } = useInfiniteCalendar({
    eventTypes,
    initialDate,
  });

  useEffect(() => {
    onActiveMonthChange(moment(activeMonth));
  }, [activeMonth]);

  return (
    <View>
       <View style={[tailwind("flex-row justify-between items-center border-b border-gray-600 h-12")]}>
        {daysOfWeek?.map((day, index) => {
          return (
            <Typography
              className='flex-1 text-center'
              key={index}
              weight="medium"
              variant="base"
            >
              {day}
            </Typography>
          )
        })}
      </View>
      <InfiniteCalendar 
        onScroll={setActiveMonth} 
        allMonths={allMonths}
        currentMonthIndex={currentMonthIndex}
        currentRange={currentRange}
        setCurrentRange={setCurrentRange}
        onPress={onPress}
      />
    </View>
  )
}

