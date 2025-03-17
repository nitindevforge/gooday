import { Typography } from "@app/ui";
import React from "react";
import { ImageBackground, Platform, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { PlanCardProps } from "./type";
import clsx from "clsx";
import { shadowStyles } from "@app/modules";
import { getAssetUrl } from "@app/utils";
import Config from 'react-native-config';

const currencySymbol = {
  INR: "₹",
  USD: "$",
  EUR: "£",
  AUD: "A$",
  NZD: "NZ$",
};
const MICRO_UNIT = Number((Config.MICRO_UNIT_PRICE ?? 1000000))

const PlanCard: React.FC<PlanCardProps> = ({
  onPress,
  className,
  checked,
  plan,
  children,
  disabled
}) => {
  const tailwind = useTailwind();
  const products = plan.availablePackages || [];

  return (
    <TouchableOpacity disabled={disabled} activeOpacity={1} onPress={onPress}>
      <View
        style={[checked && shadowStyles.dropShadow, tailwind(clsx(className))]}
      >
        <ImageBackground
          source={{
            uri: getAssetUrl(plan?.metadata?.image),
          }}
          resizeMode="cover"
          style={tailwind(clsx("rounded-3xl overflow-hidden p-6 py-8"))}
        >
          <View style={tailwind("flex-row items-center justify-between")}>
            <View style={tailwind("flex-row items-end justify-between")}>
              <Typography variant="xl" weight="medium">
                {plan?.metadata?.name} Plan - Monthly
              </Typography>
              {/* {plan?.metadata?.name === "Pro" && (
                <View style={tailwind("bg-white rounded-md px-4 ml-3")}>
                  <Typography className="text-xs" weight="medium">
                    Popular
                  </Typography>
                </View>
              )} */}
            </View>
            {products?.map((product, index) => (
              <View
                key={product?.identifier + index}
                style={[
                  { gap: 3 },
                  tailwind("flex-row items-end justify-between"),
                ]}
              >
                <Typography variant="2xl" weight="medium">
                  {currencySymbol[product?.product?.currencyCode as keyof typeof currencySymbol] ? (
                    <>
                      {currencySymbol[product?.product?.currencyCode as keyof typeof currencySymbol]}
                      {Platform.select({
                        android: product?.product?.pricePerMonth / MICRO_UNIT,
                        ios: product?.product?.pricePerMonth,
                      })}
                    </>
                  ) : (
                    <>{product?.product?.priceString}</>
                  )}
                </Typography>
                <Typography variant="sm" weight="medium">
                  /Month
                </Typography>
              </View>
            ))}
          </View>
          <Typography weight="medium" className="mt-2">
          (Auto-Renewing)
          </Typography>
          <Typography weight="medium" className="mt-2">
            {plan?.metadata.description}
          </Typography>
          <View
            style={[
              { gap: 6 },
              tailwind("flex-col items-start justify-between pl-4 mt-1"),
            ]}
          >
            {plan?.metadata.features.map((el) => (
              <View key={el.label}>
                <Typography variant="sm">{el.label}</Typography>
                {el.children.map((child) => (
                  <Typography key={child.label} color="gray-100" variant="sm">
                    {child.label}
                  </Typography>
                ))}
              </View>
            ))}
            {children}
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default PlanCard;
