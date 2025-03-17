import React from "react";
import {
  AuthDefaultLayout,
  MailVerificationForm,
  useMailVerification,
} from "@app/modules";
type MailVerificationProps = {
  navigate?: boolean
}
const MailVerification: React.FC<MailVerificationProps> = ({navigate = false}) => {
  const { form: birthdayFrom, isLoading, email } = useMailVerification(navigate);

  return (
    <AuthDefaultLayout
      back={true}
      hideProgress={true}
      hideLogo={true}
      className="bg-white"
      header="Verify your Email"
      logoType="normal"
    >
      <MailVerificationForm isLoading={isLoading} form={birthdayFrom} email={email} />
    </AuthDefaultLayout>
  );
};

export default MailVerification;
