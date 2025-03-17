import { useCallback, useEffect } from "react";
import Purchases, { CustomerInfo } from "react-native-purchases";
import { useUserOnboardingMutation } from "..";
import { UserPlanDTONameEnum } from "@gooday_corp/gooday-api-client";
import { Platform } from "react-native";

export const useInAppSubscription = () => {
  const { mutate } = useUserOnboardingMutation();

  const syncCustomerInfo = useCallback(async (customerInfo: CustomerInfo) => {
    try {
      const offerings = await Purchases.getOfferings();

      const activeSubscription = Object.values(offerings.all).find((el) =>
        customerInfo.activeSubscriptions.includes(
          el.lifetime?.product.identifier ?? ""
        )
      );

      if (activeSubscription) {
        const product = offerings.all[activeSubscription];

        if (product) {
          mutate({
            plan: {
              id: activeSubscription,
              name: Platform.select({
                ios: product.lifetime?.product.title,
                android: 'Pro',
              }) as UserPlanDTONameEnum,
            },
          });
        }
      }
    } catch (err) { }
  }, []);

  useEffect(() => {
    Purchases.addCustomerInfoUpdateListener(syncCustomerInfo);

    return () => {
      Purchases.removeCustomerInfoUpdateListener(syncCustomerInfo);
    };
  }, []);

  return { syncCustomerInfo, onPlanUpdate: mutate };
};
