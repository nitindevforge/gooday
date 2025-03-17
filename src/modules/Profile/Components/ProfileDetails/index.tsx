import React, { FC } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { ProfileDetailsProps } from "./type";
import { useTailwind } from "tailwind-rn";
import {
  ProfileNavigationStackParamList,
  useGetActivity,
  UserActivityCard,
} from "@app/modules";
import clsx from "clsx";
import { Icon, Loading, ProgressBar, Typography } from "@app/ui";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Assistant } from "@app/components";
import { getAssetUrl } from "@app/utils";

export const ProfileDetails: FC<ProfileDetailsProps> = ({
  assistant,
  editable = false,
  user,
}) => {
  const tailwind = useTailwind();
  const { data, isLoading } = useGetActivity(user?._id!);
  const activity = data?.data?.data;

  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileNavigationStackParamList>>();
  if (isLoading) return <Loading loading={isLoading} />;
  return (
    <View>
      <Loading loading={isLoading} />
      <View style={[tailwind("flex-row"), { columnGap: 20 }]}>
        <View style={[tailwind("flex-1"), { gap: 20, borderWidth: 0 }]}>
          <View style={tailwind("items-center")}>
            <View style={tailwind("relative pb-6")}>
              <Image
                source={require("@app/assets/Images/assistant-ring.png")}
                style={[
                  { height: 95, width: 174 },
                  tailwind("absolute bottom-0 left-0 right-0"),
                ]}
                resizeMode="contain"
              />
              <Assistant
                id={assistant?.id}
                style={[
                  {
                    resizeMode: "contain",
                    width: 174,
                    height: 370,
                    borderWidth: 0,
                  },
                ]}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation?.navigate("CHANGE_PERSONAL_ASSISTANT")}
              disabled={!editable}
              style={[tailwind("flex-row items-start mt-6"), {}]}
            >
              <Typography weight="semibold" className="text-[26px] mr-2">
                {assistant?.name}
              </Typography>
              {!!editable && (
                <Icon
                  name="edit"
                  variant="square-edit"
                  fill="#BABABA"
                  width={20}
                  height={20}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[
            { gap: 20, borderWidth: 0 },
            tailwind("flex-1 pt-5 pb-1 justify-end"),
          ]}
        >
          <View>
            {assistant?.attributes?.skills?.map((skill, index) => (
              <View
                key={skill?.title}
                style={tailwind(
                  clsx({
                    "mt-5": index > 0,
                  })
                )}
              >
                <Typography weight="semibold" variant="sm">
                  {skill?.title}
                </Typography>
                <View style={[tailwind("mt-2")]}>
                  <ProgressBar
                    unfilledColor="#C6C6C6"
                    color="#3A5ACA"
                    progress={skill?.weightage * 100}
                    height={6}
                  />
                </View>
              </View>
            ))}
          </View>

          {!!activity?.[0] && (
            <View style={tailwind("mt-5")}>
              <UserActivityCard
                image={{ uri: getAssetUrl(activity?.[0]?.image!) }}
                number={activity?.[0]?.value!}
                title={activity?.[0]?.label!}
              />
            </View>
          )}
        </View>
      </View>
      <View style={[tailwind("flex-row mt-4"), { columnGap: 20 }]}>
        {activity?.slice(1, activity?.length)?.map((ele) => {
          return (
            <View style={tailwind("flex-1")}>
              <UserActivityCard
                image={{ uri: getAssetUrl(ele?.image) }}
                number={ele?.value}
                title={ele?.label}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};
