import React, { useState } from "react";
import { GoalFormProps, GoalChip } from "@app/modules";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Button, Input } from "@app/ui";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useGetGoals } from "@app/modules";

const GoalForm: React.FC<GoalFormProps> = ({
  form: { setFieldValue, values, handleSubmit },
  isLoading,
}) => {
  const { data: goals } = useGetGoals();
  const tailwind = useTailwind();
  const [other, setOther] = useState(false);

  const handleChange = (goal: string) => {
    if (values.goal.includes(goal)) {
      const updatedValues = values.goal.filter((el) => el !== goal);
      setFieldValue("goal", updatedValues);
      return;
    }
    setFieldValue("goal", [...values.goal, goal]);
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={tailwind("flex-1")}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={{ ...tailwind("flex-1") }}>
        <View style={{ gap: 15, ...tailwind("flex-row flex-wrap mt-12") }}>
          {goals?.data?.data?.map((goal, index) => (
            <GoalChip
              key={index}
              onPress={() => handleChange(goal.label)}
              checked={values.goal?.includes(goal.label)}
              goal={goal.label}
            />
          ))}
        </View>
        <View style={tailwind("mt-4")}>
          <GoalChip
            checked={other}
            onPress={() => setOther(!other)}
            goal="Other..."
          />
          {!!other && (
            <Input
              onChangeText={(text) => setFieldValue("other", text)}
              underlineColorAndroid="transparent"
              placeholder="Please explain further"
              placeholderTextColor="#AEAEAE"
              numberOfLines={10}
              multiline={true}
              value={values?.other}
              returnKeyType="done"
              className="items-start mt-6"
              height={242}
            />
          )}
        </View>
      </View>
      <Button
        loading={isLoading}
        disabled={values.goal.length || values?.other ? false : true}
        onPress={handleSubmit}
        title="Next"
        className="my-4"
      />
    </KeyboardAwareScrollView>
  );
};

export default GoalForm;
