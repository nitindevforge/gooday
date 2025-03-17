import React, { useState } from "react";
import {
  FRIEND_REQUEST_STATUS,
  PhotoAccessModal,
  ProfileCardProps,
  ProfileNavigationStackParamList,
  useGetUser,
  useProfileMutation,
  useProfilePictureMutation,
  useUserOnboardingMutation,
} from "@app/modules";
import {
  ActivityIndicator,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { Button, Icon, Typography } from "@app/ui";
import { Buffer } from "buffer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { getAssetUrl } from "@app/utils";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Icons } from "@app/components";

interface ProfilePictureModalProps {
  profile: string;
  onEdit?: () => void;
}

const ProfilePictureModal = NiceModal.create<ProfilePictureModalProps>(
  ({ profile, onEdit }) => {
    const { visible, hide } = useModal();
    const tailwind = useTailwind();

    return (
      <Modal visible={visible} onRequestClose={hide} transparent>
        <View style={tailwind("relative flex-1")}>
          <View
            style={tailwind(
              "flex-1 bg-black absolute left-0 right-0 top-0 bottom-0"
            )}
          />
          <SafeAreaView style={tailwind("flex-1")}>
            <View style={tailwind("flex-1")}>
              <View
                style={tailwind(
                  "px-4 flex-row items-center justify-center relative pt-4"
                )}
              >
                <TouchableOpacity
                  onPress={hide}
                  style={tailwind("absolute left-4 top-4")}
                >
                  <Icons name="back" height={24} width={24} fill="#FFF" />
                </TouchableOpacity>
                <Typography variant="xl" color="white">
                  Profile photo
                </Typography>
                {!!onEdit && (
                  <TouchableOpacity
                    onPress={() => {
                      onEdit();
                      hide();
                    }}
                    style={tailwind("absolute right-4 top-4")}
                  >
                    <Typography variant="xl" color="white">
                      Edit
                    </Typography>
                  </TouchableOpacity>
                )}
              </View>
              <View style={tailwind("flex-1 justify-center")}>
                <Image
                  source={{ uri: getAssetUrl(profile) }}
                  style={{ height: 400, width: "100%" }}
                  resizeMode="cover"
                  defaultSource={require("../../../../assets/Images/profile.png")}
                />
              </View>
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    );
  }
);

export const ProfileCard: React.FC<ProfileCardProps> = ({
  userId,
  loading,
  image,
  name,
  goodyId,
  onFriend,
  status = false,
}) => {
  const tailwind = useTailwind();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [imageSrc, setImage] = useState<string>(image);
  const { data: user } = useGetUser();
  const { mutate: addProfile } = useProfilePictureMutation();
  const { mutate: onBoardProfile, isLoading: isOnBoardLoading } =
    useUserOnboardingMutation();
  const { mutate: uploadImage, isLoading: isUploadImageLoading } =
    useProfileMutation();
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileNavigationStackParamList>>();

  const onPhoto = () => {
    NiceModal.show(ProfilePictureModal, {
      profile: imageSrc,
      onEdit: userId ? () => setShowModal(true) : undefined,
    });
  };

  const onFile = (_: string, upload: string) => {
    addProfile(
      {
        fileName: `${userId}.png`,
        bucketName: "users",
      },
      {
        onSuccess: async (response) => {
          const buffer = Buffer.from(
            (upload || "").replace(/^data:image\/\w+;base64,/, ""),
            "base64"
          );
          uploadImage(
            { url: response?.data.signedUrl, data: buffer },
            {
              onSuccess: () => {
                onBoardProfile({
                  profile: `${`/users/${userId}.png`}?date=${new Date()?.getTime()}`,
                });
                setImage(`users/${userId}.png?date=${new Date()?.getTime()}`);
              },
            }
          );
        },
      }
    );
  };

  return (
    <View style={[tailwind("mb-3.5")]}>
      <View style={[tailwind("flex-row justify-center mb-4")]}>
        <View
          style={[
            tailwind("border-white absolute"),
            { borderWidth: 0, borderRadius: 50, top: -38 },
          ]}
        >
          <TouchableOpacity onPress={onPhoto}>
            <Image
              style={[
                tailwind("rounded-full border-4 border-white"),
                { width: 84, height: 84 },
              ]}
              source={
                imageSrc
                  ? {
                      uri: `${getAssetUrl(
                        imageSrc ?? ""
                      )}?date=${Platform.select({
                        ios: new Date().getTime(),
                      })}`,
                    }
                  : require("@app/assets/Images/profile.png")
              }
              defaultSource={require("@app/assets/Images/profile.png")}
              resizeMode="cover"
            />
          </TouchableOpacity>
          {isOnBoardLoading ||
            (isUploadImageLoading && (
              <View
                style={[
                  tailwind(
                    "absolute rounded-full items-center justify-center bg-black/40"
                  ),
                  { width: 84, height: 84 },
                ]}
              >
                <ActivityIndicator color="white" />
              </View>
            ))}
          {!onFriend && (
            <TouchableOpacity
              onPress={() => setShowModal(true)}
              style={[
                tailwind(
                  "w-7 border-white rounded-full absolute bottom-2 -right-2"
                ),
                { borderWidth: 1 },
              ]}
            >
              <Icon name="camera" width={25} height={25} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={tailwind("flex-col justify-center items-center mt-10")}>
        <Typography variant="3xl" weight="medium">
          {name ?? ""}
        </Typography>
        {goodyId && (
          <TouchableOpacity
            disabled={user?.data?.data?.goodayId !== goodyId}
            style={[
              tailwind("flex-row justify-center items-center mt-2"),
              { gap: 12 },
            ]}
            activeOpacity={0.5}
            hitSlop={24}
            onPress={() => navigation?.navigate("QR_CODE")}
          >
            <Typography variant="xl" weight="medium">
              {goodyId || "-"}
            </Typography>
            {user?.data?.data?.goodayId === goodyId && (
              <Icon
                name="qr-code"
                width={16}
                height={16}
                stroke="transparent"
                fill="transparent"
              />
            )}
          </TouchableOpacity>
        )}
      </View>
      <View style={tailwind("mx-auto mt-2")}>
        {!!onFriend && status !== FRIEND_REQUEST_STATUS.CONFIRMED && (
          <Button
            disabled={status === FRIEND_REQUEST_STATUS.PENDING ? true : false}
            loading={loading}
            radius="rounded-7"
            color="secondary"
            className="my-2 w-40"
            title={
              status === FRIEND_REQUEST_STATUS.PENDING
                ? "Requested"
                : "Add Friend"
            }
            onPress={onFriend}
          />
        )}
        {!!onFriend && status === FRIEND_REQUEST_STATUS.CONFIRMED && (
          <Button
            loading={loading}
            size="small"
            radius="rounded-7"
            color="secondary"
            className="my-2"
            right={{
              name: "down-arrow",
              width: 18,
              stroke: "white",
            }}
            title={"Friends"}
            onPress={onFriend}
          />
        )}
      </View>
      <PhotoAccessModal
        onFile={onFile}
        hide={() => setShowModal(false)}
        visible={showModal}
      />
    </View>
  );
};
