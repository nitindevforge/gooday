import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useTailwind } from "tailwind-rn";

export const PlansLoading: React.FC = () => {
  const tailwind = useTailwind();

  return (
    <SkeletonPlaceholder borderRadius={4}>
      <View style={tailwind("flex-1 flex-col bg-black")}>
        <View style={{...tailwind("w-full h-[242px] mb-4 rounded-3xl")}} />
        <View style={{...tailwind("w-full h-[242px] rounded-3xl")}} />
      </View>
    </SkeletonPlaceholder>
  );
};
