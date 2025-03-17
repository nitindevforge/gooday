import React from "react";
import { Typography } from "@app/ui";
import { useTailwind } from "tailwind-rn";
import { SafeAreaView, TouchableOpacity, View, Modal } from "react-native";
import { OptionsSheetProps } from "./type";

export const OptionsSheet: React.FC<OptionsSheetProps> = ({
  buttons,
  title,
  hide,
  visible,
}) => {
  const tailwind = useTailwind();

  return (
    <Modal animationType="slide" visible={visible} transparent>
      <SafeAreaView style={tailwind("bg-black/30 flex-1 justify-end pb-4")}>
        <View style={[tailwind("mx-4"), { gap: 10 }]}>
          <View style={tailwind("bg-white rounded-md")}>
            {title && (
              <View
                style={[
                  tailwind(
                    "flex items-center justify-center h-10 border-gray-500"
                  ),
                  { borderBottomWidth: 0.5 },
                ]}
              >
                <Typography color="gray-300" variant="xs" weight="regular">
                  Add a profile photo
                </Typography>
              </View>
            )}
            {buttons?.map((button) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={button?.onPress}
                style={[
                  tailwind(
                    "flex items-center justify-center h-12 border-gray-500"
                  ),
                  { borderBottomWidth: 0.5 },
                ]}
              >
                <Typography color="info" variant="base" weight="semibold">
                  {button?.title}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            onPress={hide}
            activeOpacity={1}
            style={tailwind(
              "flex mb-6 items-center bg-white justify-center h-12 rounded-md"
            )}
          >
            <Typography color="info" variant="base" weight="semibold">
              Cancel
            </Typography>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
