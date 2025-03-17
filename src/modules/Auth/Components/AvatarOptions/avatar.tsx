import React, { useEffect, useMemo, useState } from "react";
import {
  AvatarOptionsProps,
  useAssistant,
  useGetPlans,
  useGetUser,
  AvatarCard,
  Role,
} from "@app/modules";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Button, Carousel, Loading } from "@app/ui";
import AvatarDetailsCard from "../AvatarDetailsCard";
import clsx from "clsx";

const AvatarOptions: React.FC<AvatarOptionsProps> = ({
  form: { values, handleSubmit, setFieldValue },
  isLoading,
  compact,
  cta = "Save",
}) => {
  const tailwind = useTailwind();
  const { data, isLoading: isAvatarLoading } = useAssistant();
  const { data: user, isLoading: isUserLoading } = useGetUser();
  const { data: plans, isLoading: isPlansLoading } = useGetPlans();
  const [active, setActive] = useState(0);

  const assistant = useMemo(() => {
    if (!isPlansLoading && data?.data?.data && !isUserLoading) {
      let plan = plans?.data?.data?.find(
        (element) => element?.name === user?.data?.data?.plan?.name
      )?.name;
      if (user?.data?.data?.role === Role.BUSINESS) {
        return data?.data?.data;
      }

      return data?.data?.data?.filter((element) =>
        element?.availability?.includes(plan?.toUpperCase()!)
      );
    }
  }, [data, plans, isPlansLoading, isUserLoading, user]);

  useEffect(() => {
    const selectedAvatar = assistant?.[active];
    if (selectedAvatar) {
      setFieldValue("avatar", selectedAvatar?.id);
    } else {
      setFieldValue("avatar", assistant?.[0]?.id);
    }
  }, [active, assistant]);

  return (
    <View style={{ ...tailwind("flex-1") }}>
      <Loading loading={isAvatarLoading || isPlansLoading} />
      <View
        style={{
          gap: 12,
          ...tailwind(
            clsx("flex-row mt-5 flex-1", {
              "px-6": compact,
            })
          ),
        }}
      >
        <Carousel
          slides={assistant || []}
          slideComponent={AvatarCard}
          pagination={true}
          slideActiveIndex={setActive}
          assistant={user?.data?.data?.assistant}
        />
      </View>
      <View style={compact ? tailwind("px-6") : {}}>
        <AvatarDetailsCard details={assistant?.[active]?.attributes!} />
        <Button
          loading={isLoading}
          disabled={values?.avatar ? false : true}
          onPress={handleSubmit}
          className="mb-4 mt-8"
          title={cta}
        />
      </View>
    </View>
  );
};

export default AvatarOptions;
