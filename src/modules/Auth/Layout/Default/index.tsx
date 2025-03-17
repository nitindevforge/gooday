import React, { PropsWithChildren } from "react";
import { AuthDefaultLayoutProps } from "./type";
import { ImageBackground, SafeAreaView, View } from "react-native";
import { LoadingUi, ProgressBar } from "@app/ui";
import clsx from "clsx";
import { HeaderWithLogo } from "@app/modules";
import { useTailwind } from "tailwind-rn";
import { useNavigationRoute } from "@app/common";

const AuthDefaultLayout: React.FC<
  PropsWithChildren<AuthDefaultLayoutProps>
> = ({
  className,
  progress,
  header,
  backgroundImage,
  children,
  logoType,
  subtitle,
  hideLogo,
  hideProgress = false,
  childrenStyles,
  back = true,
  headerStyles,
}) => {
  const {
    pendingActionsState,
    currentRoute,
    back: progressBack,
    loading,
  } = useNavigationRoute();
  const tailwind = useTailwind();

  const activeIndex: number = pendingActionsState?.indexOf(currentRoute!) + 1;
  const stepProgress = 100 / (pendingActionsState.length + 1);

  progress = progress
    ? progress
    : progressBack
    ? stepProgress * activeIndex + stepProgress
    : stepProgress * activeIndex;

  const prevProgress = progressBack
    ? stepProgress * activeIndex
    : progress - stepProgress;

  return (
    <>
      <LoadingUi loading={loading} />
      <ImageBackground
        style={tailwind(clsx("bg-primary-200 flex-1", className))}
        source={backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={tailwind("flex-1 relative")}>
          <View style={tailwind("px-6 pt-4")}>
            {!hideProgress ? (
              <ProgressBar
                progress={progress}
                prevProgress={prevProgress > 0 ? prevProgress : 0}
                back={progressBack}
              />
            ) : null}
            {header && (
              <HeaderWithLogo
                hideLogo={hideLogo}
                subtitle={subtitle}
                className={headerStyles ? headerStyles : "mt-2"}
                logoType={logoType}
                title={header}
                back={back}
              />
            )}
          </View>
          <View style={[tailwind("px-6 pt-4 flex-1"), childrenStyles]}>
            {children}
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

export default AuthDefaultLayout;
