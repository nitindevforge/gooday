import React from "react";
import { FilterHeaderProps } from "./type";
import { useTailwind } from "tailwind-rn";
import { Chip } from "@app/ui";
import { View } from "react-native";
import { EventTypes } from "../../Containers";

export const FilterHeader: React.FC<FilterHeaderProps> = ({
  data,
  onPress,
  eventTypes,
}) => {
  const tailwind = useTailwind();

  return (
    <View style={[tailwind("flex-row mt-2 justify-center")]}>
      {data?.map((element, i) => {
        return (
          <View style={[tailwind('px-1')]}>
            <Chip
              key={element?.label + i}
              background={`${element?.background} ${eventTypes.length > 0 &&
                !eventTypes.includes(element.value)
                ? "opacity-40"
                : ""
                }`}
              label={element?.label}
              onPress={() => onPress(element.value as EventTypes)}
              textColor={element?.textColor}
              variant={element?.variant}
            />
          </View>
        );
      })}
    </View>
  );
};
