import React from "react";
import { AuthDefaultLayout, useIntegrations } from "@app/modules";
import { TouchableOpacity, View } from "react-native";
import { Button, Typography } from "@app/ui";
import { useNavigationRoute } from "@app/common";
import { SyncCalendarListContainer } from "../../../Profile/Containers";
import { useTailwind } from "tailwind-rn";

type CalendarOptionsProps = {};
const CalendarOptions: React.FC<CalendarOptionsProps> = () => {
  const { goToRoute } = useNavigationRoute();
  const { data } = useIntegrations();
  const tailwind = useTailwind();

  return (
    <AuthDefaultLayout
      hideProgress={true}
      hideLogo={true}
      back={false}
      className="bg-white"
      header="Sync Calendar"
      logoType="normal"
    >
      <View style={tailwind("mt-8 flex-1")}>
        <SyncCalendarListContainer />
      </View>

      <View>
        <TouchableOpacity onPress={() => goToRoute()}>
          <Typography
            weight="medium"
            variant="sm"
            color="gray-500"
            className="text-center"
          >
            Skip, I’ll confirm later
          </Typography>
        </TouchableOpacity>
        <Button
          disabled={
            !data?.data.data?.filter(
              (element) =>
                element?.integrationType === "microsoft" ||
                element?.integrationType === "google"
            )?.length
          }
          onPress={() => goToRoute()}
          className="mb-8 mt-5"
          title="Next"
        />
      </View>
    </AuthDefaultLayout>
  );
};

export default CalendarOptions;
