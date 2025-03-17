import React, { useState } from "react";
import { Alert, SafeAreaView, StatusBar, View } from "react-native";
import {
  HeaderWithLogo,
  MyQRCode,
  ProfileNavigationStackParamList,
  ScanCode,
  TabBar,
} from "@app/modules";
import { useTailwind } from "tailwind-rn";
import { Typography } from "@app/ui";
import clsx from "clsx";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const QRCodeScreen = () => {
  const tailwind = useTailwind();
  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileNavigationStackParamList>>();
  const [active, setActive] = useState<string>("my-code");

  const handleQRScanFinish = (content: string) => {
    try {
      const user = JSON.parse(content);
      if (user?.userId) {
        navigation.navigate("FRIEND", { userId: user?.userId });
      }
    } catch (err) {
      setActive('my-code');
      Alert.alert("Gooday", "Invalid QR code");
    }
  };

  return (
    <SafeAreaView style={tailwind("flex-1")}>
      <StatusBar barStyle='dark-content' backgroundColor="#FFF" />

      <View style={tailwind("px-6")}>
        <HeaderWithLogo title="Gooday QR code" className="mt-6" hideLogo />
      </View>
      <View style={tailwind("flex-1 mt-6")}>
        <TabBar
          tabs={[
            {
              label: "My Code",
              value: "my-code",
            },
            {
              label: "Scan",
              value: "scan",
            },
          ]}
          contentWrapperStyle={tailwind("justify-normal")}
          tabStyle={tailwind("w-1/2")}
          renderItem={({ label, value }) => (
            <View
              style={tailwind(
                clsx({
                  "border-b-2 border-primary-300": value === active,
                })
              )}
            >
              <Typography
                weight={value === active ? "medium" : "light"}
                variant="xl"
                className="text-center mb-4"
              >
                {label}
              </Typography>
            </View>
          )}
          onPress={setActive}
          active={active}
        />
        <View style={tailwind("flex-1")}>
          {active === "my-code" ? (
            <MyQRCode />
          ) : (
            <ScanCode onFinish={handleQRScanFinish} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
