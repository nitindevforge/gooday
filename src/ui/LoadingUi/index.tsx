import React, { FC } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { AnimatedLogo } from "@app/ui";
import { useLoading } from "@app/common";

export const LoadingUi: FC<{ loading?: boolean }> = ({
  loading: isLoading = false,
}) => {
  const tailwind = useTailwind();
  const { loading } = useLoading();

  if (!loading && !isLoading) return;

  return (
    <View style={styles.loadingContainer}>
      <SafeAreaView
        style={[
          tailwind("flex-1 items-center justify-center"),
          {
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 1000,
          },
        ]}
      >
        <View style={tailwind("relative")}>
          <AnimatedLogo
            width={150}
            height={150}
            colorTransition={false}
            infinity
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    position: "absolute", // Make sure it covers the entire screen
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10, // Ensures it overlays other elements
  },
});
