import React from "react";
import { View } from "react-native";
import { Button } from "@app/ui";
import { RoleCard, Role, RoleData, RoleFormProps } from "@app/modules";
import { useTailwind } from "tailwind-rn";

export const RoleForm: React.FC<RoleFormProps> = ({
  form: { values, handleSubmit, setFieldValue },
}) => {
  const tailwind = useTailwind();
  const roles: RoleData[] = [
    {
      title: "Personal",
      value: Role.PERSONAL,
      image: require("@app/assets/Images/personal.png"),
      bgImage: require("@app/assets/Images/personal-bg.png"),
    },
    {
      title: "Business",
      value: Role.BUSINESS,
      image: require("@app/assets/Images/business.png"),
      bgImage: require("@app/assets/Images/business-bg.png"),
    },
  ];
  
  return (
    <View style={tailwind("flex-1")}>
      <View style={[{ gap: 18 }, tailwind("mt-8 flex-1 px-4")]}>
        {roles?.map((role) => (
          <RoleCard
            key={role?.title}
            checked={values?.role === role?.value}
            onPress={() => setFieldValue("role", role?.value)}
            role={role}
          />
        ))}
      </View>
      <Button
        disabled={values?.role ? false : true}
        onPress={handleSubmit}
        className="mb-4 mt-16"
        title="Next"
      />
    </View>
  );
};
