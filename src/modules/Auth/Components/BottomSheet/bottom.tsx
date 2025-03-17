import React, { useEffect, useMemo } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Modal } from "react-native";
import {
  AvatarContainer,
  BusinessConfirmationContainer,
  CalendarOptionsContainer,
  BusinessDetailsContainer,
  BusinessDetailsInfoContainer,
  BusinessDetailsPolicyContainer,
  GoalContainer,
  MailVerificationContainer,
  PlansContainer,
  USER_ACTION,
  UserBasicInfoContainer,
  UserDobInfoContainer,
} from "@app/modules";
import { useNavigationRoute } from "@app/common";
interface BottomSheetProps {
  pendingActions?: string[];
}
export const BottomSheet = NiceModal.create<BottomSheetProps>(
  ({ pendingActions }) => {
    const { visible } = useModal();
    const { currentRoute, setCurrentRoute, setPendingAction,pendingActionsState } =
      useNavigationRoute();

    const screen = useMemo(() => {
      switch (currentRoute) {
        case USER_ACTION.MAIL_VERIFICATION:
          return <MailVerificationContainer />;

        case USER_ACTION.NICK_NAME:
          return <UserBasicInfoContainer />;

        case USER_ACTION.DOB:
          return <UserDobInfoContainer />;

        case USER_ACTION.ASSISTANT:
          return <AvatarContainer />;

        case USER_ACTION.PLAN:
          return <PlansContainer />;

        case USER_ACTION.GOALS:
          return <GoalContainer />;

        case USER_ACTION.BUSINESS_DETAILS:
          return <BusinessDetailsInfoContainer />;

        case USER_ACTION.BUSINESS_TIME:
          return <BusinessDetailsContainer />;

        case USER_ACTION.BUSINESS_ADDITIONAL_INFO:
          return <BusinessDetailsPolicyContainer />;

        case USER_ACTION.BUSINESS_CONFIRMATION:
          return <BusinessConfirmationContainer />;

        case USER_ACTION.INTEGRATION:
          return <CalendarOptionsContainer />;
      }
    }, [currentRoute]);

    useEffect(() => {
      if (pendingActions && pendingActions?.length > 0) {
        setCurrentRoute(pendingActions[0]);
        setPendingAction(pendingActions ?? []);
      }
    }, [pendingActions]);

    return (
      <Modal
        animationType="slide"
        visible={visible}
        presentationStyle="fullScreen"
      >
        {screen}
      </Modal>
    );
  }
);
