import { CalendarDates } from "@app/ui";
import { memo } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { useTailwind } from "tailwind-rn";
import { EventList } from "../eventList";
import { ITEM_HEIGHT } from "../constants";
import { useInfiniteCalendarStore } from "@app/modules";
import moment from "moment";

const getFormattedDate = (date: Date) => {
  const year = date.toLocaleString("default", { year: "numeric" });
  const month = date.toLocaleString("default", { month: "2-digit" });
  const day = date.toLocaleString("default", { day: "2-digit" });

  return year + "-" + month + "-" + day;
}

const groupEventsByMonth = (events: any[], month: string) => {
  const eventMap: any = {};
  const targetMonth = new Date(month).getMonth(); // Extract target month

  events.forEach((event) => {
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

    while (startDate <= endDate) {
      const formattedDate = getFormattedDate(startDate);

      // Ensure event falls within the target month
      if (startDate.getMonth() === targetMonth) {
        if (!eventMap[formattedDate]) {
          eventMap[formattedDate] = [];
        }
        eventMap[formattedDate].push(event);
      }

      // Move to the next day
      startDate.setDate(startDate.getDate() + 1);
    }
  });

  return eventMap;
};

export const CalendarMonth: React.FC<{
  groupedDates: CalendarDates[]
  month: string;
  onPress: (date: Date) => void;
}> = memo(({
  groupedDates,
  month,
  onPress,
}) => {
  const tailwind = useTailwind();
  const { events } = useInfiniteCalendarStore();

  const eventsForThisMonth = groupEventsByMonth(events, month)

  return (
    <>
      {groupedDates.map((dates, index) => (
        <View key={index} style={[tailwind("flex-row border-t border-gray-600"), { gap: 4 }]}>
          {dates.map((el) => (
            <TouchableOpacity
              disabled={el.monthType !== 'current'}
              key={el.date}
              style={[tailwind("flex-1 items-center justify-start pt-3"), { height: ITEM_HEIGHT / groupedDates.length }]}
              onPress={() => {
                onPress(new Date(el.date));
              }}
            >
              <View style={tailwind("w-full h-full")}>
                {el.monthType === "current" && (
                  <>
                    <Text style={tailwind("text-xl font-medium text-center")}>{el.day}</Text>
                    {moment(el.date).format("DD-MM-YYYY") === moment().format("DD-MM-YYYY") &&
                      !eventsForThisMonth?.[el.date]?.length &&
                      (<Image
                        style={{ width: 30, position: "absolute", top: 25 }}
                        source={require("../../../../../assets/Images/stroke-line.png")}
                      />)}
                    <EventList date={el.date} eventsForThisMonth={eventsForThisMonth} />
                  </>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </>
  )
});