import { Loading } from "@app/ui";
import { useFormik } from "formik";
import React, { Fragment, useEffect } from "react";
import { ProfileLayout } from "../../Components";
import { Alert, View } from "react-native";
import { PermissionToggle } from "@app/components";
import { useUserPermissionSyncMutation } from "../../Data";
import { useGetUser } from "@app/modules";

export const NotificationSettingListContainer = () => {
  const { data } = useGetUser();
  const { mutate, isLoading } = useUserPermissionSyncMutation();
  const permissions = data?.data?.data?.permissions;

  const { values, setFieldValue, submitForm, initialValues,resetForm } = useFormik({
    initialValues: {
      calendar: permissions?.calendar ?? false,
      tasks: permissions?.tasks ?? false,
      reminders: permissions?.reminders ?? false,
      waitlist: permissions?.waitlist ?? false,
      booking: permissions?.booking ?? false,
      invites: permissions?.invites ?? false,
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
      <ProfileLayout header="Notifications">
        <View style={{ gap: 30 }}>
          <PermissionToggle
            label="Calendar"
            isEnabled={values.calendar}
            onChange={(value) => setFieldValue("calendar", value)}
          />
          <PermissionToggle
            label="Tasks"
            isEnabled={values.tasks}
            onChange={(value) => setFieldValue("tasks", value)}
          />
          <PermissionToggle
            label="Reminders"
            isEnabled={values.reminders}
            onChange={(value) => setFieldValue("reminders", value)}
          />
          <PermissionToggle
            label="Waitlist"
            isEnabled={values.waitlist}
            onChange={(value) => setFieldValue("waitlist", value)}
          />
          <PermissionToggle
            label="Booking and rebooking"
            isEnabled={values.booking}
            onChange={(value) => setFieldValue("booking", value)}
          />
          <PermissionToggle
            label="Invites"
            isEnabled={values.invites}
            onChange={(value) => setFieldValue("invites", value)}
          />
        </View>
      </ProfileLayout>
    </Fragment>
  );
};
