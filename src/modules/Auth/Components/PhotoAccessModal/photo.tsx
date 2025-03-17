import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { Button, Icon, Typography } from "@app/ui";
import { OptionsSheet, PhotoAccessProps } from "@app/modules";
import {
  Options,
  openCamera,
  openPicker,
  Image as ImagePickerResponse,
} from "react-native-image-crop-picker";
import { usePermissions } from "@app/common";

export const PhotoAccessModal: React.FC<PhotoAccessProps> = ({
  onFile,
  visible,
  hide,
  mediaType = "photo",
}) => {
  const tailwind = useTailwind();
  const [showModal, setShowModal] = useState(false);
  const [checking, setChecking] = useState(false);
  const { requestPermissions, RESULTS, checkPermissions } = usePermissions();

  const options: Options = {
    mediaType: mediaType,
    includeBase64: true,
    cropping: true,
  };

  const onCamera = async () => {
    const image = await openCamera(options);
    handleResponse(image);
  };

  const onGallery = async () => {
    const image = await openPicker(options);
    handleResponse(image);
  };

  const onPermissionAllow = async () => {
    const status = await requestPermissions();
    if ([RESULTS.GRANTED, RESULTS.LIMITED]?.includes(status)) {
      setShowModal(true);
    } else {
      Alert.alert(
        "Error",
        "Please enable it in app settings to use all features of the app."
      );
    }
  };

  const handleResponse = (response: ImagePickerResponse) => {
    if (response.data) {
      let imageUri = response.data || "";
      if (imageUri) {
        onFile(response.path!, imageUri || "");
        setShowModal(false);
        hide();
      }
    } else {
      Alert.alert("Error", "Something went wrong!!");
    }
  };

  useEffect(() => {
    (async () => {
      const status = await checkPermissions();
      setShowModal([RESULTS.GRANTED, RESULTS.LIMITED]?.includes(status));
      setChecking(true);
    })();
  }, [checkPermissions, RESULTS]);

  return (
    <>
      {checking && visible && (
        <>
          {showModal ? (
            <OptionsSheet
              visible={true}
              hide={() => {
                setShowModal(false);
                hide();
              }}
              title="Add a profile photo"
              buttons={[
                {
                  title: "Choose from library",
                  onPress: onGallery,
                },
                {
                  title: "Take photo",
                  onPress: onCamera,
                },
              ]}
            />
          ) : (
            <Modal
              animationType="slide"
              visible={true}
              presentationStyle="fullScreen"
            >
              <SafeAreaView style={tailwind("flex-1")}>
                <TouchableOpacity
                  onPress={hide}
                  activeOpacity={0.7}
                  style={tailwind("flex-row justify-end mt-6 mr-6")}
                >
                  <Icon width={30} height={30} name="close" fill="black" />
                </TouchableOpacity>

                <View
                  style={[
                    tailwind("flex-1 justify-center items-center px-10"),
                    { gap: 10 },
                  ]}
                >
                  <Image
                    source={require("../../../../assets/Images/photo.png")}
                    resizeMode="contain"
                  />
                  <Typography variant="base" weight="semibold">
                    Allow Access to Photos
                  </Typography>
                  <Typography
                    color="gray-500"
                    variant="sm"
                    className="text-center"
                  >
                    This will help you to find photos faster by viewing your
                    entire media gallery
                  </Typography>
                </View>
                <View
                  style={[
                    tailwind("justify-center items-center px-10"),
                    { gap: 10 },
                  ]}
                >
                  <Typography
                    color="gray-300"
                    variant="xs"
                    className="text-center"
                  >
                    You can change this anytime in your device settings.
                  </Typography>
                </View>
                <View style={tailwind("px-8 py-10")}>
                  <Button title="Continue" onPress={onPermissionAllow} />
                </View>
              </SafeAreaView>
            </Modal>
          )}
        </>
      )}
    </>
  );
};
