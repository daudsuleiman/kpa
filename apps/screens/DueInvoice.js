import React, { useContext, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import KpaEndpoints from "../../api/KpaEndpoints";
import TospayIndecator from "../../tospay-library/components/TospayIndecator";
import KpaPayButton from "../components/KpaPayButton";
import SelectableBillItem from "../components/SelectableBillItem";
import KpaContext from "../provider/KpaContext";

export default function DueInvoice({ navigation }) {
  const [selectedInvoice, setSelectedInvoice] = useState([]);
  const [valueChanged, setvalueChanged] = useState(false);
  const [total, setTotal] = useState(0.0);
  const [isGeneratingPrn, setIsGeneratingPrn] = useState(false);

  const { invoices, customerNumber } = useContext(KpaContext);

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
    console.log(response.data);

    navigation.navigate("Summary", {
      data: selectedInvoice,
      description:response.data.data,
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

  const currency = invoices[0].currency;

  return (
    <View style={{ flexGrow: 1, backgroundColor: "#FFFFFF" }}>
      <TospayIndecator isLoading={isGeneratingPrn} />
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
