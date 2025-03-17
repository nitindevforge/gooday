import React from 'react'
import { AuthDefaultLayout, GoalForm, useGoal } from '@app/modules';
import { StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const Goal: React.FC = () => {
  const { form, isLoading } = useGoal();
  const isFocused = useIsFocused();

  return (
    <AuthDefaultLayout
      className="bg-white"
      header={`What are you using \nGooday for?`}
      headerStyles='mt-12'
    >
      {isFocused && <StatusBar backgroundColor="#FFF" barStyle="dark-content" />}

      <GoalForm form={form} isLoading={isLoading} />
    </AuthDefaultLayout>
  );
}

export default Goal