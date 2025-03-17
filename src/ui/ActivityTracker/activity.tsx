import { Typography } from "@app/ui";
import clsx from "clsx";
import React, { Fragment, useEffect, useState } from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { ActivityTrackerState, ActivityTrackerProps } from "./type";

export const ActivityTracker: React.FC<ActivityTrackerProps> = ({
  rowLimit,
  data,
  activityComponent: ActivityComponent,
  scrollElement,
  hideCompletedLine,
  componentStyle,
  trackLineHeight = 50,
}) => {
  const tailwind = useTailwind();
  const [activities, setActivities] = useState<ActivityTrackerState[]>([]);
  const [moreThenRowLimit, setMoreThenRowLimit] = useState(
    rowLimit! < data?.length
  );

  const onStart = Math.ceil(rowLimit! / 2);
  const onLast = Math.floor(rowLimit! / 2);

  const getPrevActivity = (activeIndex: number, index: number) => {
    for (let i = 1; i < onStart; i++) {
      if (activeIndex - i === index) {
        return activeIndex - i === index;
      }
    }
  };

  useEffect(() => {
    if (rowLimit! < data.length) {
      const activeIndex = data.findIndex((el) => el.active);
      let updatedData = data.filter((el, index) => {
        let getOne = getPrevActivity(activeIndex, index);
        return !el.completed || el.active || (el.completed && getOne);
      });
      if (rowLimit! < updatedData?.length) {
        updatedData = updatedData.filter(
          (el, index) => index < onStart || index >= updatedData.length - onLast
        );
      } else {
        setMoreThenRowLimit(false);
      }
      if (updatedData?.length >= activities?.length) {
        setActivities(updatedData);
      } else {
        setActivities(data.slice(-rowLimit!));
      }
    } else {
      setActivities(data);
    }
  }, [rowLimit, data]);

  useEffect(() => {
    if (!moreThenRowLimit) {
      scrollElement?.current?.scrollToEnd();
    }
  }, [moreThenRowLimit]);

  return (
    <View
      style={[
        tailwind("flex-col flex-1 items-center relative py-5"),
        componentStyle,
      ]}
    >
      {activities.map((el, index) => (
        <Fragment key={el?._id || el.title}>
          {ActivityComponent ? (
            <ActivityComponent index={index} rowData={el} />
          ) : (
            <Typography>{el.title}</Typography>
          )}
          {index !== activities?.length - 1 && (
            <>
              <View
                style={[
                  tailwind(
                    clsx("w-[2px] bg-gray-600 relative", {
                      "h-28": moreThenRowLimit && index === onStart - 1,
                    })
                  ),
                  {
                    height: trackLineHeight,
                  },
                ]}
              >
                {!hideCompletedLine && el.completed && (
                  <View style={tailwind("flex-col items-center")}>
                    <View
                      style={[
                        tailwind(
                          clsx("w-[2px] bg-gray-600", {
                            "bg-black": el.completed,
                          })
                        ),
                        {
                          height: el.active
                            ? trackLineHeight / 2 - 5
                            : trackLineHeight,
                        },
                      ]}
                    ></View>
                    {el.active && (
                      <View style={tailwind("w-2 h-2 bg-black rounded-full")} />
                    )}
                  </View>
                )}
              </View>
            </>
          )}
        </Fragment>
      ))}
    </View>
  );
};
