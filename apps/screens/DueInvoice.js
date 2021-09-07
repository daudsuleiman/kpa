import React, { useContext, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { Root, Popup } from "popup-ui";
import KpaEndpoints from "../../api/KpaEndpoints";
import TospayIndecator from "../../tospay-library/components/TospayIndecator";
import KpaPayButton from "../components/KpaPayButton";
import SelectableBillItem from "../components/SelectableBillItem";
import KpaContext from "../provider/KpaContext";
import TospayText from "../../tospay-library/components/TospayText";

export default function DueInvoice({ navigation }) {
  const [selectedInvoice, setSelectedInvoice] = useState([]);
  const [valueChanged, setvalueChanged] = useState(false);
  const [total, setTotal] = useState(0.0);
  const [isGeneratingPrn, setIsGeneratingPrn] = useState(false);
  const [invoices, setinvoices] = useState([]);
  const [currency, setcurrency] = useState("");
  const [noBillerAccout, setNoBillerAccout] = useState(false);
  const isFocused = useIsFocused();

  const { cusPassword, customerNumber } = useContext(KpaContext);

  const fetchInvoice = async () => {
    if (customerNumber === undefined && cusPassword == undefined) {
      setNoBillerAccout(true);
      return;
    }

    const data = {
      customernumber: customerNumber,
      password: cusPassword,
    };
    setIsGeneratingPrn(true);
    const response = await KpaEndpoints.billerLogin(data);

    if (!response.ok) {
      setIsGeneratingPrn(false);
      console.log(response);
      return;
    }

    setIsGeneratingPrn(false);
    setinvoices(response.data.data);

    setcurrency(response.data.data[0].currency);
  };

  useEffect(() => {
    if (isFocused) {
      fetchInvoice();
    }
  }, [isFocused]);

  const handleGeneratePrn = async () => {
    const genData = {
      customernumber: customerNumber,
      invoices: selectedInvoice,
    };
    setIsGeneratingPrn(true);
    const response = await KpaEndpoints.generatePrn(genData);

    if (!response.ok) {
      setIsGeneratingPrn(false);
      console.log(response);
    }

    setIsGeneratingPrn(false);

    navigation.navigate("Summary", {
      data: selectedInvoice,
      description: response.data.data,
      type: "Invoice",
    });
  };

  useEffect(() => {
    let sum = 0.0;

    selectedInvoice.map((item) => {
      sum = parseFloat(sum) + parseFloat(item.amount);
      return sum;
    });

    setTotal(sum);
  }, [valueChanged]);

  return (
    <View style={{ flexGrow: 1, backgroundColor: "#FFFFFF" }}>
      <TospayIndecator isLoading={isGeneratingPrn} />
      {noBillerAccout && (
        <View
          style={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TospayText style={{ margin: 16, textAlign: "center" }}>
            Sorry, Please add a biller account to proceed
          </TospayText>
        </View>
      )}
      <View style={{ flex: 1 }}>
        <FlatList
          data={invoices}
          keyExtractor={(item) => item.bill_no.toString()}
          renderItem={(item) => (
            <SelectableBillItem
              type={"Invoice"}
              data={item.item}
              selectedData={(selectedData) => {
                selectedInvoice.push(selectedData);
                setvalueChanged(!valueChanged);
              }}
              removeItem={(itemToRemove) => {
                setSelectedInvoice(
                  selectedInvoice.filter((item) => {
                    return item.bill_no !== itemToRemove.bill_no;
                  })
                );
                setvalueChanged(!valueChanged);
              }}
            />
          )}
        />
      </View>

      <View style={{ backgroundColor: "#fff" }}>
        <KpaPayButton
          onPress={() => {
            if (!selectedInvoice.length) {
              console.log("Nothing is selected");
              return;
            }

            handleGeneratePrn();
          }}
          leftText={"GENERATE PRN"}
          rightText={total.toLocaleString()}
          currency={currency}
          isDisabled={selectedInvoice.length ? false : true}
        />
      </View>
    </View>
  );
}
