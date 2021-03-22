import client from "../tospay-library/api/client/client";

const billerLogin = (loginData) => {
  const data = {
    passcode: loginData.password,
    customer_number: loginData.customernumber,
  };

  return client.post("/kpa/management/login", data);
};

const generatePrn = (genData) => {
  const data = {
    customer_number: genData.customernumber,
    invoices: genData.invoices,
  };

  return client.post("/kpa/management/generate", data);
};

const getPaymentToken = (PayData) => {
  const data = {
    reference: PayData.reference,
  };

  return client.post("kpa/payments/pay", data);
};

export default {
  billerLogin,
  generatePrn,
  getPaymentToken
};
