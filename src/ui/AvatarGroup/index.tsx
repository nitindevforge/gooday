import React from "react";
import { Image, View } from "react-native";
import { useTailwind } from "tailwind-rn";

interface AvatarGroupProps {
  avatars: string[];
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({ avatars }) => {
  const tailwind = useTailwind();

  if (!avatars?.length) {
    return null;
  }
  return (
    <View style={[tailwind("flex-row pl-4")]}>
      {avatars.slice(0, 3).map((avatar, index) => (
        <Image
          key={index}
          source={{ uri: avatar }}
          defaultSource={require("@app/assets/Images/profile.png")}
          style={[tailwind("h-8 w-8 rounded-full -ml-3")]}
          resizeMode="cover"
        />
      ))}
    </View>
  );
};
