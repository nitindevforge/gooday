import React from "react";
import { ScrollView, View } from "react-native";
import { Button } from "@app/ui";
import { useTailwind } from "tailwind-rn";
import { PlansLoading, useGetPlans, PlanCard, PlanFormProps } from "@app/modules";

const PlanForm: React.FC<PlanFormProps> = ({
  form: { values, handleSubmit, setFieldValue },
  isLoading,
}) => {
  const tailwind = useTailwind();

  const { data: plans, isLoading: isPlansLoading } = useGetPlans();

  return isPlansLoading ? (
    <PlansLoading />
  ) : (
    <View style={tailwind("flex-1")}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[{ gap: 20 }, tailwind("mt-1 flex mb-12 flex-1")]}>
            {plans?.data?.data?.filter((element) => element?.name === 'Free' || element?.name === 'Pro').map((plan) => (
            <PlanCard
              key={plan?._id}
              plan={plan}
              checked={values?.plan?.id === plan._id}
              onPress={() => {
                setFieldValue("plan.id", plan._id);
                setFieldValue("plan.name", plan.name);
              }}
            />
          ))}
        </View>
      </ScrollView>
      <Button
        loading={isLoading}
        disabled={values?.plan ? false : true}
        onPress={handleSubmit}
        className="mb-4"
        title="Next"
      />
    </View>
  );
};

export default PlanForm;
