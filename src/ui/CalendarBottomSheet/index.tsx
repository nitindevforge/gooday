import React, { Fragment, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { CalendarBottomSheetProps } from "./type";
import { useTailwind } from "tailwind-rn";
import { Calendar } from "../Calendar/calendar";
import Typography from "../Typography";
import { checkMonth, getFormattedDate } from "@app/utils";
import { Icon } from "../Icon";
import { TimeChip, useGetAvailableSlots } from "@app/modules";
import moment from "moment";
import { EmptyComponent } from "../EmptyComponent";
import { CalendarSlots } from "@gooday_corp/gooday-api-client";
import clsx from "clsx";

export const CalendarBottomSheet: React.FC<CalendarBottomSheetProps> = ({
  open = false,
  onClose,
  onChangeMonth = () => { },
  slotsMonth,
  slotPeriod,
  collaborators,
  onTimeChange,
  type,
  ...rest
}) => {
  const tailwind = useTailwind();

  const {
    data: slots,
    isLoading: isSlotsLoading,
    isFetching,
  } = useGetAvailableSlots({
    collaborators: collaborators || [],
    startDate: moment(slotsMonth).startOf("month").toISOString(),
    endDate: moment(slotsMonth).endOf("month").toISOString(),
    staffs: []
  });

  const { data: daySlots, isLoading: isDaySlotsLoading } = useGetAvailableSlots(
    {
      collaborators: collaborators || [],
      startDate: new Date(
        moment(rest?.date).startOf("day").format()
      )?.toISOString(),
      endDate: new Date(
        moment(rest?.date).endOf("day").format()
      )?.toISOString(),
      staffs: []
    }
  );

  const filterSlots = useMemo(() => {
    let slots = daySlots?.data?.data?.[0]?.slots.filter(
      (el) =>
        moment(el?.start).toISOString() !==
        moment(rest?.startDate).toISOString()
    );
    if (rest?.startDate && type === "end") {
      slots = slots?.filter((el) => moment(el?.start).isAfter(rest?.startDate));
    }
    return slots;
  }, [daySlots, rest?.startDate, type]);

  const loading = isSlotsLoading || isFetching;

  const onTimeChipPress = (slot: CalendarSlots) => {
    onTimeChange(slot);
  };

  return (
    <>
      {open && (
        <Modal visible={open} transparent animationType="slide">
          <TouchableOpacity
            activeOpacity={1}
            onPress={onClose}
            style={tailwind("flex-1 items-center justify-end bg-black/40")}
          />
          <View
            style={[
              tailwind("w-full bg-white border-gray-500 relative"),
              { borderTopWidth: 1.5 },
            ]}
          >
            <View>
              <View style={tailwind("flex-row items-center px-5")}>
                {slotPeriod === "month" ? (
                  <>
                    <TouchableOpacity
                      disabled={loading || checkMonth(rest?.date)}
                      style={tailwind("flex w-7 h-11 justify-center")}
                      onPress={() => onChangeMonth(true)}
                    >
                      <Icon
                        fill={
                          loading || checkMonth(rest?.date)
                            ? "#DADADA"
                            : "#2E2E2E"
                        }
                        name="back"
                        stroke="none"
                        width={10}
                        height={20}
                      />
                    </TouchableOpacity>

                    <Typography weight="semibold" variant="17" className="mt-1">
                      {getFormattedDate("MMMM YYYY", rest?.date)}
                    </Typography>
                    <TouchableOpacity
                      disabled={loading}
                      style={[
                        tailwind("flex w-7 h-11 justify-center"),
                        {
                          transform: [{ rotate: "180deg" }],
                        },
                      ]}
                      onPress={() => onChangeMonth()}
                    >
                      <Icon
                        fill={loading ? "#DADADA" : "#2E2E2E"}
                        name="back"
                        stroke="none"
                        width={10}
                        height={20}
                      />
                    </TouchableOpacity>
                  </>
                ) : (
                  <Typography weight="semibold" variant="17" className="mt-4">
                    Select {type === "start" ? "Start" : "End"} Time
                  </Typography>
                )}
              </View>
              <View
                style={{
                  height: 400,
                  width: "100%",
                }}
              >
                {slotPeriod === "month" ? (
                  <Calendar
                    slots={slots?.data?.data as unknown as []}
                    {...rest}
                  />
                ) : (
                  <Fragment>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      numColumns={3}
                      data={filterSlots}
                      renderItem={({ item, index }) => (
                        <View
                          style={[
                            tailwind("w-1/3"),
                            index % 3 !== 0 ? tailwind("pl-4") : {},
                          ]}
                        >
                          <TimeChip
                            date={rest?.date}
                            onPress={onTimeChipPress}
                            slot={rest?.date}
                            slide={item}
                            hasConflict={item?.unavailableFriends?.length > 0}
                          />
                        </View>
                      )}
                      columnWrapperStyle={{
                        flex: 1,
                        justifyContent: "flex-start",
                      }}
                      contentContainerStyle={[
                        tailwind("p-4"),
                        {
                          gap: 20,
                        },
                      ]}
                      ListEmptyComponent={
                        <View style={tailwind("items-center mt-5")}>
                          {!isDaySlotsLoading && (
                            <EmptyComponent massage="No slots Available!" />
                          )}
                        </View>
                      }
                      keyExtractor={(item) => item?.start}
                    />
                    <SafeAreaView />
                  </Fragment>
                )}
              </View>
            </View>
            {loading && (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: "rgba(0,0,0,0.2)",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator size={"large"} />
              </View>
            )}
          </View>
        </Modal>
      )}
    </>
  );
};
