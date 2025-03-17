import { View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Typography } from "@app/ui";
import { eventBgColor } from "@app/utils";
import clsx from "clsx";
import { memo } from "react";

export const EventList: React.FC<{
  date: string;
  eventsForThisMonth: Record<string, any[]>;
}> = memo(({
  date,
  eventsForThisMonth
}) => {
  const tailwind = useTailwind();
  const totalHeightForIndividualItem = 70;
  const totalItemsPerDateToShow = 4;
  const itemHeight = totalHeightForIndividualItem / totalItemsPerDateToShow;

  const events: any[] = eventsForThisMonth[date] ?? [];

  const eventsForDate = events?.filter?.((event) => {
    const eventClone = JSON.parse(JSON.stringify(event));
    const eventStartDate = new Date(eventClone?.startDate);
    eventStartDate.setHours(0, 0, 0, 0);
    const eventEndDate = new Date(eventClone?.endDate);
    eventEndDate.setHours(23, 59, 59, 999);
    const targetDate = new Date(date);

    return targetDate >= eventStartDate && targetDate <= eventEndDate;
  });

  const isStartDate = eventsForDate.some((event) => {
    return new Date(event?.startDate).toDateString() === new Date(date).toDateString();
  });

  const isEndDate = eventsForDate.some((event) => {
    return new Date(event?.endDate).toDateString() === new Date(date).toDateString();
  });

  const eventNodes = eventsForDate.map((event: any, index) => {
    return (
      <View key={index} style={[tailwind(`${isStartDate ? 'rounded-l-[3px]' : isEndDate ? 'rounded-r-[3px]' : ''} overflow-hidden`), { height: itemHeight }]}>
        <View
          style={[
            tailwind(
              clsx('px-1 py-1 h-full', {
                [`${(eventBgColor as any)?.[event.eventType]}`]: event.eventType !== 'unconfirmed',
                'bg-gray-600 border-gray-400 border-dashed': event.eventType === 'unconfirmed',
                'bg-gray-600': event?.type === 'google',
                "bg-purple-100": event?.type === 'microsoft'
              })
            ),
            {
              ...(event.eventType === 'unconfirmed' && { borderWidth: 1 })
            }
          ]}
        >
          <Typography weight="semibold" variant="11" numberOfLines={1}>
            {event?.title}
          </Typography>
        </View>
      </View>
    )
  });

  return (
    <View style={tailwind("flex-1")}>
      {eventNodes.length > totalItemsPerDateToShow ? eventNodes.slice(0, totalItemsPerDateToShow - 1).map((node, index) => (
        <View key={index}>
          {node}
        </View>
      )).concat(
        <View>
          <Typography weight="semibold" variant="9">
            +{eventNodes.length - (totalItemsPerDateToShow - 1)}
          </Typography>
        </View>
      ) : eventNodes.map((node, index) => (
        <View key={index}>
          {node}
        </View>
      ))}
    </View>
  );
});