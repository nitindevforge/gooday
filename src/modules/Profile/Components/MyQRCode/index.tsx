import React, { useRef, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import QRCode from "react-native-qrcode-svg";
import { Icon, Typography } from "@app/ui";
import { useGetUser } from "@app/modules";
import Share from "react-native-share";
import Svg from "react-native-svg";
import { getAssetUrl } from "@app/utils";

export const MyQRCode = () => {
  const tailwind = useTailwind();
  const { data } = useGetUser();
  const qrCodeRef = useRef<Svg>();

  const handleShareQRCode = () => {
    qrCodeRef.current?.toDataURL((dataUrl) => {
      Share.open({ url: `data:image/png;base64,${dataUrl}`, title: "Gooday", subject: "Gooday" });
    });
  };

  return (
    <View style={tailwind("bg-primary-100 flex-1 items-center justify-center")}>
      <View
        style={[
          tailwind("bg-white items-center"),
          {
            width: 301,
            height: 325,
            borderRadius: 15,
            gap: 12,
          },
        ]}
      >
        <Image
          style={[tailwind("rounded-full -mt-8"), { width: 68, height: 68 }]}
          source={data?.data?.data?.profile ? { uri: getAssetUrl(data?.data?.data?.profile) } : require("@app/assets/Images/profile.png")}
          defaultSource={require("@app/assets/Images/profile.png")}
          resizeMode="cover"
        />
        <View style={[tailwind("items-center"), { gap: 24 }]}>
          <Typography weight="semibold" variant="xl">
            {data?.data?.data?.firstName} {data?.data?.data?.lastName}
          </Typography>
          <QRCode
            value={JSON.stringify({
              goodayId: data?.data?.data?.goodayId ?? "",
              userId: data?.data?.data?._id ?? "",
            })}
            size={180}
            getRef={(c) => (qrCodeRef.current = c)}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={handleShareQRCode}
        activeOpacity={0.8}
        style={[tailwind("flex-row mt-5"), { columnGap: 15 }]}
      >
        <Icon name="export" stroke="none" fill="white" />
        <Typography variant="lg" weight="medium" color="white">
          Share my code
        </Typography>
      </TouchableOpacity>
    </View>
  );
};
