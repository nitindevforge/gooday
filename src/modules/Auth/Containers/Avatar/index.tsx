import React from "react";
import { AuthDefaultLayout, AvatarOptions, useAvatar } from "@app/modules";
import { useTailwind } from "tailwind-rn";
import { useNavigationRoute } from "@app/common";
import { StatusBar } from "react-native";

const Avatar: React.FC = () => {
  const { goToRoute } = useNavigationRoute();
  const { form, isLoading } = useAvatar({
    onSuccess: goToRoute,
  });
  const tailwind = useTailwind();

  return (
    <AuthDefaultLayout
      className="bg-white"
      header={"Choose Your Personal Assistant"}
      childrenStyles={tailwind("px-0")}
      back
    >
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />

      <AvatarOptions form={form} isLoading={isLoading} compact cta="Next" />
    </AuthDefaultLayout>
  );
};

export default Avatar;
