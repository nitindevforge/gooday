import { AvatarGroup, Icon } from "@app/ui";
import { getAssetUrl } from "@app/utils";
import { UserEntity } from "@gooday_corp/gooday-api-client";
import React, { useRef } from "react";
import { Pressable, TextInput, TextInputProps, View } from "react-native";
import { useTailwind } from "tailwind-rn";

interface TaskInputBaseProps extends TextInputProps {
  assignedTo?: UserEntity[];
  drag?: () => void;
  className?: string;
}

export const TaskInputBase = React.forwardRef<TextInput, TaskInputBaseProps>(
  ({ assignedTo, drag, className, ...props }, ref) => {
    const tailwind = useTailwind();
    return (
      <View
        style={[
          tailwind(
            `border items-center bg-white border-gray-600 px-4 h-14 rounded-2xl flex-1 flex-row ${className}`
          ),
          { gap: 12, minHeight: 56 },
        ]}
      >
        {!!drag && (
          <Pressable onLongPress={drag} hitSlop={24}>
            <Icon name="menu" stroke="#646464" />
          </Pressable>
        )}

        <TextInput
          ref={ref}
          returnKeyType="done"
          placeholderTextColor="#AEAEAE"
          {...props}
          style={[tailwind(`flex-1 h-14`), props?.style]}
        />
        <AvatarGroup
          avatars={(assignedTo as unknown as UserEntity[])
            ?.filter(Boolean)
            ?.map((el) => getAssetUrl(el.profile))}
        />
        {props?.task?.urgent && (
          <Icon name="exclamation" width={20} height={20} />
        )}
      </View>
    );
  }
);
