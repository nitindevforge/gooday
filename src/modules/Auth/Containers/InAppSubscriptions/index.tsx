import React, { Fragment, useEffect, useState } from "react";
import { Linking, Platform, ScrollView, TouchableOpacity, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Button, Loading, ProgressBar, Typography } from "@app/ui";
import Purchases, { PurchasesOffering } from "react-native-purchases";
import { PlanCard, useGetUser, useInAppSubscription } from "../..";
import config from "@app/config";

export const InAppSubscriptions = ({ action }: any) => {
  const { syncCustomerInfo, onPlanUpdate } = useInAppSubscription();
  const { data } = useGetUser();
  const activePlan = data?.data?.data?.plan;
  const [products, setProducts] = useState<PurchasesOffering[]>([]);
  const [loading, setLoading] = useState(false);
  const tailwind = useTailwind();
  const [number, setNumber] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const fetchProducts = async () => {
    const offerings = await Purchases.getOfferings();
    setProducts(Object.values(offerings.all));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const buySubscription = async (plan: PurchasesOffering) => {
    setLoading(true);
    try {
      const availablePackage = plan?.availablePackages?.[0];

      if (availablePackage) {
        const info = await Purchases.purchasePackage(availablePackage);
        if (action) {
          action({
            id: availablePackage?.product?.identifier,
            name: Platform.select({
              ios: availablePackage?.product?.title,
              android: "Pro",
            }),
          });
        }

        setNumber(1);
        setIsRunning(true);
        syncCustomerInfo(info.customerInfo);
      }

      setLoading(false);
    } catch (err: any) {
      onPlanUpdate({});
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval: any;
    if (isRunning && number < 100) {
      const step = (30 * 1000) / 100;
      interval = setInterval(() => {
        setNumber((prevNumber) => {
          if (prevNumber >= 100) {
            clearInterval(interval);
            return prevNumber;
          }
          return prevNumber + 1;
        });
      }, step);
    } else {
      setNumber(0);
      setIsRunning(false);
    }
    return () => {
      return clearInterval(interval);
    };
  }, [isRunning, number]);

  const currencyCode = products?.[0]?.availablePackages?.[0]?.product?.currencyCode ?? "ghcvnf";

  return (
    <Fragment>
      <Loading loading={loading} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tailwind('flex-1')}>
        <View style={[tailwind("flex-1"), { gap: 10 }]}>
          <View style={[{ gap: 20 }, tailwind("mt-1 flex flex-1")]}>
            {products.map((plan) => (
              <PlanCard
                disabled={isRunning}
                key={plan.identifier}
                plan={plan}
                checked={false}
                onPress={() => buySubscription(plan)}
              />
            ))}
            {isRunning && (
              <View style={tailwind("mx-4")}>
                <ProgressBar progress={number} />
              </View>
            )}
          </View>
          <View style={{ gap: 10 }}>
            <View style={{ gap: 10 }}>
              {
                !activePlan &&
                <TouchableOpacity
                  onPress={() =>
                    action({
                      id: "free",
                      name: "Free",
                    })
                  }
                >
                  <Typography
                    weight="medium"
                    variant="sm"
                    color="gray-500"
                    className="text-center"
                  >
                    Skip, I’ll decide later
                  </Typography>
                </TouchableOpacity>
              }

              <Typography className="text-center" color="gray-300">
                Prices shown in {currencyCode}
              </Typography>
            </View>
            <View
              style={[
                tailwind("flex-row justify-center"),
                { gap: 10 },
              ]}
            >
              <Typography
                color="primary-300"
                className="underline"
                onPress={() => Linking.openURL(config.PRIVACY_POLICY_URL)}
              >
                Privacy Policy
              </Typography>
              <Typography>|</Typography>
              <Typography
                color="primary-300"
                className="underline"
                onPress={() => Linking.openURL(config.TERMS_CONDITION_PAGE_URL)}
              >
                Terms & Conditions
              </Typography>
            </View>
          </View>
        </View>
      </ScrollView>
    </Fragment>
  );
};
