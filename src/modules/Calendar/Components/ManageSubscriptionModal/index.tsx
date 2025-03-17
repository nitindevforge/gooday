import React, { useMemo } from "react";
import { PlanCard, useGetPlans, useGetUser, usePlan } from "@app/modules";
import { Alert, Modal, SafeAreaView, TouchableWithoutFeedback, View } from "react-native";
import { Button, Loading } from "@app/ui";
import { PlanEntity } from "@gooday_corp/gooday-api-client";
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useTailwind } from "tailwind-rn";

export const ManageSubscriptionModal = NiceModal.create(() => {
  const { visible, hide } = useModal();
  const tailwind = useTailwind();
  const { data: plans, isLoading: isPlansLoading } = useGetPlans();
  const { form, isLoading } = usePlan(hide);
  const { data } = useGetUser(undefined, { refetchOnMount: true });
  const currentPlan = data?.data?.data?.plan;

  const filteredPlans = useMemo(
    () =>
      plans?.data?.data?.filter(
        (element) =>
          (element?.name === "Free" || element?.name === "Pro") &&
          currentPlan?.id !== element._id
      ) ?? [],
    [plans, form.values]
  );

  const changePlan = async () => {
    try {
      await form.submitForm();
    } catch (err) {
      Alert.alert("Gooday", "Something went wrong!!");
    }
  };

  const handlePlanChange = async (plan: PlanEntity) => {
    form.setFieldValue("plan.id", plan._id);
    form.setFieldValue("plan.name", plan.name);

    switch (plan.name) {
      case "Free":
        Alert.alert(
          "Are you sure?",
          `Once you downgrade your subscription, you will no longer use benefits of Pro plan`,
          [
            {
              isPreferred: true,
              text: "Cancel",
            },
            {
              text: "Downgrade",
              onPress: changePlan,
            },
          ]
        );
        break;
      case "Pro":
        changePlan();
        break;
    }
  };

  return (
    <Modal
      transparent
      visible={visible}>
      <SafeAreaView style={tailwind('flex-1')}>
        <Loading loading={isPlansLoading || isLoading} />
        <TouchableWithoutFeedback onPress={hide}>
          <View style={{ gap: 28, flex: 1, justifyContent: "center", alignItems: 'center' }}>
            {filteredPlans.map((plan) => (
              <PlanCard
                key={plan?._id}
                plan={plan}
                checked={false}
                onPress={() => handlePlanChange(plan)}
                children={
                  <View style={{ gap: 6, width: '100%', marginTop: 12 }}>
                    <Button title="Purchase" onPress={() => handlePlanChange(plan)} className="w-full" />
                    <Button title="Cancel" onPress={hide} className="w-full bg-transparent" />
                  </View>
                }
              />
            ))}
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </Modal>
  );
})
