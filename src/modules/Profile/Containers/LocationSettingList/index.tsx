import { PermissionToggle } from "@app/components";
import { useFormik } from "formik";
import React, { Fragment, useEffect } from "react";
import { Alert, Platform, View } from "react-native";
import moment from "moment-timezone";
import { ProfileLayout } from "../../Components";
import { Loading } from "@app/ui";
import { useGetUser } from "@app/modules";
import { useUserPermissionSyncMutation } from "../../Data";
import { check, openSettings, PERMISSIONS, RESULTS } from "react-native-permissions";

export const LocationSettingListContainer = () => {
  const { data } = useGetUser();
  const { mutate, isLoading } = useUserPermissionSyncMutation();
  const permissions = data?.data?.data?.permissions;
  const { values, setFieldValue, submitForm, initialValues, resetForm } =
    useFormik({
      initialValues: {
        locationAccessPermission:
          permissions?.locationAccessPermission ?? false,
        deviceTimezone: permissions?.deviceTimezone ?? false,
        timezone: permissions?.timezone ?? false,
      },
      enableReinitialize: true,
      onSubmit: async (values) => {
        mutate(values, {
          onError: () => {
            Alert.alert(
              "Sync failed",
              "We are unable to update permission. Please try again!!"
            );
          },
          onSuccess() {
            // resetForm()
          },
        });
      },
    });

  useEffect(() => {
    if (JSON.stringify(initialValues) !== JSON.stringify(values)) {
      submitForm();
    }
  }, [values, initialValues]);

  return (
    <Fragment>
      <Loading loading={isLoading} />
      <ProfileLayout header="Location">
        <View style={{ gap: 30 }}>
          <PermissionToggle
            label="Location access permission"
            isEnabled={values.locationAccessPermission}
            onChange={async (value) => {
              setFieldValue("locationAccessPermission", value)
              const location = await check(
                Platform.select({
                  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
                } as any)
              );
              if (RESULTS?.GRANTED !== location) {
                Alert.alert(
                  "Location Permission Required",
                  "This feature requires access to your location. Please enable location permissions in settings.",
                  [
                    {
                      text: "Cancel",
                      style: "cancel",
                      onPress: () => {
                        setFieldValue("locationAccessPermission", false)
                      }
                    },
                    {
                      text: "Open Settings",
                      onPress: () => openSettings(),
                    },
                  ]
                );
              } else {
                mutate({
                  ...permissions,
                  locationAccessPermission: true
                })
              }
            }
            }
          />
          {/* <PermissionToggle
            label="User device's time zone"
            isEnabled={values.deviceTimezone}
            onChange={(value) => setFieldValue("deviceTimezone", value)}
          /> */}
          <PermissionToggle
            hideToggle={true}
            label="Time zone"
            isEnabled={values.timezone}
            value={data?.data?.data?.timezone ?? moment.tz.guess()}
            onChange={(value) => setFieldValue("timezone", value)}
          />
        </View>
      </ProfileLayout>
    </Fragment>
  );
};
