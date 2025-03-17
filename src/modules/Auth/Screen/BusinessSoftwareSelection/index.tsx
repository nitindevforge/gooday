import { SearchInput } from "@app/ui";
import { useTailwind } from "tailwind-rn";
import { AuthDefaultLayout } from "@app/modules";
import { FlatList, TouchableOpacity, View } from "react-native";

export const BusinessSoftwareSelectionScreen = () => {
  const tailwind = useTailwind();
  return (
    <>
      <AuthDefaultLayout
        subtitle="Or select from options below"
        header={`Search Booking\nSoftware`}
        className="bg-white"
        childrenStyles={tailwind("px-0")}
        progress={10}
        back
      >
        <View style={tailwind("flex-1")}>
          <FlatList
            data={new Array(10)}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 20, paddingHorizontal: 10 }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={[
                    tailwind("bg-black rounded-2xl flex-1"),
                    { marginHorizontal: 10, height: 165 },
                  ]}
                >
                </TouchableOpacity>
              );
            }}
            keyExtractor={(_, index) => index?.toString()}
          />
        </View>
      </AuthDefaultLayout>
      <View style={tailwind("bg-gray-700 h-28 rounded-t-2xl pt-4 px-4")}>
        {/* <SearchInput placeholder="Search" placeholderTextColor="#3C3C4399" /> */}
      </View>
    </>
  );
};
