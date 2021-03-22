import React from "react";
import CheckOutNavigation from "../../tospay-library/auth/navigation/CheckoutNavigation";

export default function KpaCheckout({ route }) {
  return <CheckOutNavigation paymentToken={route.params.token} />;
}
