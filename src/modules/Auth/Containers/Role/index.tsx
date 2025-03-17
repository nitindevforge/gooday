import React from 'react';
import { RoleForm, useRole } from '@app/modules';

const Role: React.FC = () => {
  const {form} = useRole();

  return <RoleForm form={form} />;
};

export default Role;
