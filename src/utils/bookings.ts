import { BusinessEntity, UserEntity } from "@gooday_corp/gooday-api-client";

export const getBookingTitle = ({
  business,
  user,
}: {
  business: BusinessEntity;
  user: UserEntity;
}) => {
  if (business?.name) {
    return `Booking at ${business?.name}`
  }
  // if (business?.name && user?.nickName) {
  //   return `${business?.name} <> ${user?.nickName}`;
  // }

  // if (business?.name && user?.firstName) {
  //   return `${business?.name} <> ${user?.firstName}`;
  // }
  return "Gooday Booking";
};

export const eventBgColor = {
  bookings: "bg-yellow-100",
  shared: "bg-blue-100",
  invites: "bg-purple-100",
  unconfirmed: "bg-gray-600",
  rescheduled: "bg-yellow-100",
  confirmed: "bg-blue-100",
};

export const eventBorderColor = {
  bookings: "#876718",
  shared: "#2E2E2E",
  invites: "#233679",
  unconfirmed: "#2E2E2E",
  rescheduled: "#C8D1F1",
  confirmed: "#2E2E2E",
};

export const eventTextColor = {
  bookings: "dark-m",
  shared: "gray-100",
  invites: "purple-100",
  unconfirmed: "gray-100",
  rescheduled: "primary-200",
  confirmed: "primary-300",
};
