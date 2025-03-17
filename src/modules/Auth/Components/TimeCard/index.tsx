import React, { useState } from "react";
import { CheckBox, DatePickerModel, Icon, Input, Typography } from "@app/ui";
import { TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { TimeCardProps } from "./type";
import clsx from "clsx";
import { getFormattedDate, getMaxDate } from "@app/utils";
import moment from "moment";

export const TimeCard: React.FC<TimeCardProps> = ({
  item,
  onAddTime,
  onChangeTime,
  onChangeTiming,
  onRemoveTime,
  parentIndex,
}) => {
  const tailwind = useTailwind();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [time, setTime] = useState<{
    time?: Date;
    index?: number;
    name?: "openAt" | "closeAt";
  }>();

  const onDatePickerOpen = (index: number, name: string) => {
    const openTime = moment("09:00 AM", "hh:mm A").toDate();
    const closeTime = moment("07:00 PM", "hh:mm A").toDate();
    const currentTime = item?.time?.[0]?.[name];
    const myTime = currentTime
      ? moment(currentTime, "hh:mm A").toDate()
      : name === "openAt"
        ? openTime
        : closeTime;
    if (!item?.isClose) {
      setTime({ ...(time as any), index, name, time: myTime });
      setIsOpen(true);
    }
  };

  const onAddTimeItem = () => {
    !item?.isClose && onAddTime();
  };

  const openAt = item?.time?.find((_, index) => index === time?.index)?.openAt;

  return (
    <>
      <View
        style={tailwind(
          clsx("flex-1 flex flex-row", {
            "mt-6": parentIndex! > 0,
          })
        )}
      >
        <View style={{ flex: 0.3 }}>
          <TouchableOpacity activeOpacity={0.7} onPress={onChangeTiming}>
            <Typography className="mb-0.5 -mt-1.5" variant="base" weight="bold">
              {item?.day}
            </Typography>
            <View style={{ flex: 1 }}>
              <CheckBox
                checked={item?.isClose!}
                label="Closed"
                onPress={onChangeTiming}
                size="small"
                variant="filled"
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={[{ flex: 0.7, borderWidth: 0 }]}>
          {item?.time?.map((element, i) => {
            return (
              <View
                key={i}
                style={[
                  tailwind(
                    clsx("flex flex-row items-center", {
                      "mt-6": i > 0,
                    })
                  ),
                ]}
              >
                <View style={tailwind("z-10 flex-1")}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => onDatePickerOpen(i, "openAt")}
                  >
                    <Input
                      onPress={() => onDatePickerOpen(i, "openAt")}
                      editable={false}
                      value={element?.openAt}
                      placeholder="00:00 AM"
                      className="rounded-xl"
                      style={{ fontSize: 14 }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={tailwind("bg-gray-600 w-2.5 h-0.5 mx-1.5")}></View>
                <View style={tailwind("z-10 flex-1")}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => onDatePickerOpen(i, "closeAt")}
                  >
                    <Input
                      onPress={() => onDatePickerOpen(i, "closeAt")}
                      editable={false}
                      value={element?.closeAt}
                      placeholder="00:00 PM"
                      className="rounded-xl"
                      style={{ fontSize: 14 }}
                    />
                  </TouchableOpacity>
                </View>
                {i === 0 ? (
                  <TouchableOpacity
                    activeOpacity={!item?.isClose ? 0.5 : 1}
                    style={tailwind("ml-3 h-8 w-4 justify-center")}
                    onPress={onAddTimeItem}
                  >
                    <Icon name="add" stroke="#2F4B93" width={12} height={12} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={!item?.isClose ? 0.5 : 1}
                    style={tailwind("ml-3 w-4 h-8 justify-center")}
                    onPress={() => !item?.isClose && onRemoveTime(i)}
                  >
                    <View style={tailwind("bg-secondary-100 w-3 h-0.5")}></View>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>
      </View>
      <DatePickerModel
        minimumDate={time?.name === "closeAt" ? getMaxDate(openAt!) : undefined}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        date={time?.time || new Date()}
        mode="time"
        onDateChange={(date) => setTime({ ...(time as any), time: date })}
        onSubmit={() => {
          const timeValue = getFormattedDate("LT", time?.time);
          onChangeTime(timeValue, time?.name!, time?.index!);
          setTime({});
          setIsOpen(false);
        }}
      />
    </>
  );
};
