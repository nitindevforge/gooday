import React, { Fragment } from "react";
import {
  BusinessDetailsFormProps,
  TimeCard,
  TimeLineHeader,
} from "@app/modules";
import { View } from "react-native";
import { Button, Typography } from "@app/ui";
import { useTailwind } from "tailwind-rn";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export const BusinessDetailsForm: React.FC<BusinessDetailsFormProps> = ({
  form: { values, handleSubmit, setFieldValue, errors },
  isLoading,
  onSubmitDetails = () => { }
}) => {
  const tailwind = useTailwind();

  let isTimeEmpty = false;

  values?.timing?.forEach((day) => {
    if (!day?.isClose) {
      day.time?.forEach((time) => {
        if (time.openAt.trim() === "" && time.closeAt.trim() === "") {
          isTimeEmpty = true;
        }
      });
    }
  });

  const isFormValid = Object.keys(errors).length === 0 && !isTimeEmpty;

  const onAddTime = (index: number) => {
    const updatedTiming = [...values?.timing];
    updatedTiming[index]?.time?.push({ openAt: "", closeAt: "" });
    setFieldValue("timing", updatedTiming);
  };

  const onChangeTime = (
    type: "openAt" | "closeAt",
    value: string,
    dayIndex: number,
    timeIndex: number
  ) => {
    const updatedTiming = [...values.timing];
    if (
      updatedTiming[dayIndex]?.time &&
      Array.isArray(updatedTiming[dayIndex].time)
    ) {
      updatedTiming[dayIndex].time[timeIndex][type] = value;
      if (type === "openAt") {
        updatedTiming[dayIndex].time[timeIndex]["closeAt"] = "";
      }
    }
    setFieldValue("timing", updatedTiming);
  };

  const onRemoveTime = (dayIndex: number, timeIndex: number) => {
    const updatedTiming = [...values.timing];
    updatedTiming[dayIndex].time = updatedTiming[dayIndex]?.time?.filter(
      (_, i) => i !== timeIndex
    );
    setFieldValue("timing", updatedTiming);
  };

  const onChangeTiming = (index: number) => {
    const updatedTiming = [...values.timing];
    if (updatedTiming[index]) {
      updatedTiming[index].isClose = !updatedTiming[index].isClose;
      setFieldValue("timing", updatedTiming);
    }
  };
  return (
    <Fragment>
      <View style={tailwind("flex-1")}>
        <Typography weight="medium" variant="sm">
          Opening Hours
        </Typography>
        <View style={tailwind("mt-2")}>
          <TimeLineHeader />
        </View>
        <KeyboardAwareScrollView
          style={tailwind("flex-1")}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={tailwind("mt-2")}>
            {values?.timing?.map((item, index) => {
              return (
                <TimeCard
                  key={index}
                  parentIndex={index}
                  item={item}
                  onAddTime={() => onAddTime(index)}
                  onChangeTime={(text, value, i) =>
                    onChangeTime(value, text, index, i)
                  }
                  onChangeTiming={() => onChangeTiming(index)}
                  onRemoveTime={(i) => {
                    onRemoveTime(index, i);
                  }}
                />
              );
            })}
          </View>
        </KeyboardAwareScrollView>
      </View>
      <View style={tailwind("mt-6 mb-4")}>
        <Typography
          className="text-center mb-2"
          onPress={() => {
            onSubmitDetails({
              timing: values?.timing?.map((el) => ({
                ...el,
                isClose: true,
              }))
            })
          }}
        >
          Skip
        </Typography>
        <Button
          disabled={!isFormValid}
          loading={isLoading}
          onPress={handleSubmit}
          className=""
          title="Next"
        />
      </View>
    </Fragment>
  );
};
