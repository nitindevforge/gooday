import { useFormik } from "formik";
import { Alert, Appearance, Platform } from "react-native";
import {
  useUserOnboardingMutation,
  PlanFormState,
  useGetUser,
  usePlanUpsertMutation,
  useGetPlans,
} from "@app/modules";
import { useNavigationRoute } from "@app/common";
import { confirmPlatformPayPayment, PlatformPay, useStripe, isPlatformPaySupported, PlatformPayError, PaymentSheetError, StripeError } from "@stripe/stripe-react-native";
import { useState } from "react";

class CustomError extends Error {
  private readonly code: PlatformPayError | PaymentSheetError
  constructor(public readonly _error: StripeError<PlatformPayError | PaymentSheetError>) {
    super(_error.localizedMessage);
    this.code = _error.code;
  }
}

const color = Platform.select({
  android: '#000000',
  ios: "#000000",
});
const customAppearance = {
  font: {
    scale: 1.15,
  },
  shapes: {
    borderRadius: 12,
    borderWidth: 0.5,
  },
  primaryButton: {
    shapes: {
      borderRadius: 20,
    },
  },
  colors: {
    background: "#ffffff",
    componentDivider: color,
    primaryText: color,
    secondaryText: color,
    componentText: color,
    placeholderText: "#73757b",
  },
};
const usePlan = (onSuccess?: () => void) => {
  const { data, refetch } = useGetUser();
  const { data: planListResponse } = useGetPlans()
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate, isLoading } = useUserOnboardingMutation();
  const { setPendingAction, setCurrentRoute, setCanBackGo } =
    useNavigationRoute();
  const { mutate: payment, isLoading: isPaymentLoading } =
    usePlanUpsertMutation();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const form = useFormik<PlanFormState>({
    initialValues: {
      plan: {
        name: data?.data?.data?.plan?.name! ?? "",
        id: data?.data?.data?.plan?.id ?? "",
      },
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const selectedPlan = planListResponse?.data?.data?.find(el => el._id === values.plan.id);

      if (!selectedPlan) {
        return
      }
      setLoading(true)
      payment(
        { plan: values.plan.id },
        {
          onSuccess: async (res) => {
            try {
              if (res.data?.data?.clientSecret) {
                const isApplePaySupported = await isPlatformPaySupported()
                if (!isApplePaySupported) {
                  const { error: errors } = await initPaymentSheet({
                    appearance: customAppearance,
                    style: "alwaysLight",
                    merchantDisplayName: "Gooday",
                    customerEphemeralKeySecret: res.data?.data?.ephemeralKey,
                    paymentIntentClientSecret: res?.data?.data?.clientSecret,
                    allowsDelayedPaymentMethods: true,
                    defaultBillingDetails: {
                      name: `${data?.data?.data?.firstName} ${data?.data?.data?.lastName}`,
                      email: data?.data?.data?.email,
                    },
                  });
                  if (errors) {
                    setLoading(false)
                    throw new Error("Init payment sheet failed");
                  }

                  await new Promise((resolve) =>
                    setTimeout(() => resolve(null), 2500)
                  );

                  const { error } = await presentPaymentSheet();

                  if (error) {
                    setLoading(false)
                    throw new CustomError(error)
                  }
                } else {
                  const { error: errors } = await confirmPlatformPayPayment(
                    res.data?.data?.clientSecret,
                    {
                      applePay: {
                        cartItems: [
                          {
                            label: data?.data?.data?.plan?.name! ?? "",
                            amount: (selectedPlan.prices?.[0]?.amount / 100).toString(),
                            paymentType: PlatformPay.PaymentType.Recurring,
                            intervalUnit: PlatformPay.IntervalUnit.Month,
                            intervalCount: 1,
                          },
                        ],
                        merchantCountryCode: 'AU',
                        currencyCode: selectedPlan.currency.toUpperCase(),
                        requiredBillingContactFields: [PlatformPay.ContactField.PhoneNumber],
                      },
                    }
                  );
                  if (errors) {
                    setLoading(false)
                    throw new CustomError(errors)
                  }

                  await new Promise((resolve) =>
                    setTimeout(() => resolve(null), 2500)
                  );
                }
              }

              mutate(
                {
                  plan: values?.plan,
                },
                {
                  onSuccess: (response) => {
                    form?.resetForm();
                    setPendingAction(response?.data?.data?.pendingAction!);
                    setLoading(false)
                    setCurrentRoute(response?.data?.data?.pendingAction?.[0]!);
                    setCanBackGo(false);
                    refetch();
                    onSuccess?.();
                    setLoading(false)
                  },
                  onError: async (error) => {
                    Alert.alert("Error", error.response?.data?.message || 'Something went wrong!!');
                    setLoading(false)
                  },
                }
              );
            } catch (err) {
              let error = err as unknown as CustomError;
              setLoading(false)
              if (![PlatformPayError.Canceled, PaymentSheetError.Canceled].includes(error.code)) {
                Alert.alert(
                  "Gooday",
                  error.message
                );
              }
            }
          },
          onError: async (error) => {
            setLoading(false)
            Alert.alert(
              "Gooday",
              error.response?.data?.message ||
              "Something went wrong while doing payment. Please contact support!!"
            );
          },
        }
      );
    },
  });

  return { form, isLoading: isPaymentLoading || isLoading || loading };
};

export default usePlan;
