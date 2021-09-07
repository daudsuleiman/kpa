import React, { useContext, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import KpaEndpoints from "../../api/KpaEndpoints";
import TospayIndecator from "../../tospay-library/components/TospayIndecator";
import TospayText from "../../tospay-library/components/TospayText";
import TospayContext from "../../tospay-library/provider/TospayContext";
import KpaPayButton from "../components/KpaPayButton";
import SelectableOpenBill from "../components/SelectableOpenBill";
import KpaClientContext from "../provider/KpaClientContext";

export default function DueBills({ navigation }) {
  const [selectedPrn, setSelectedPrn] = useState([]);
  const [valueChanged, setvalueChanged] = useState(false);
  const [total, setTotal] = useState(0.0);
  const [isLoading, setisLoading] = useState(false);
  const [dueBills, setdueBills] = useState([]);
  const [currency, setcurrency] = useState("");
  const [noBillerAccout, setNoBillerAccout] = useState(false);
  const isFocused = useIsFocused();

  const { billerClient } = useContext(KpaClientContext);
  const { country } = useContext(TospayContext);

  const isEmpty = (obj) => {
    for (var x in obj) {
      return false;
    }
    return true;
  };

  const fetchbills = async () => {
    const dataPost = {
      status: "GENERATED",
      customer_number: billerClient.customernumber,
    };

    setisLoading(true);
    const response = await KpaEndpoints.fetchOpenBills(dataPost);
    if (!response.ok) {
      setisLoading(false);
      console.log(response);
    }

    setisLoading(false);
    setdueBills(response.data.data);
    if (isEmpty(response.data.data)) {
      setcurrency(country.currency);
    } else {
      setcurrency(response.data.data[0].currency);
    }
  };

  useEffect(() => {
    let sum = 0.0;

    selectedPrn.map((item) => {
      sum = parseFloat(sum) + parseFloat(item.amount);
      return sum;
    });

    setTotal(sum);
  }, [valueChanged]);

  useEffect(() => {
    if (isFocused) {
      fetchbills();
    }
  }, [isFocused]);

  return (
    <View style={{ flexGrow: 1, backgroundColor: "#FFFFFF" }}>
      <TospayIndecator isLoading={isLoading} />
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
          data={dueBills}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(item) => (
            <SelectableOpenBill
              selectedData={(selectedData) => {
                selectedPrn.push(selectedData);
                setvalueChanged(!valueChanged);
              }}
              removeItem={(itemToRemove) => {
                setSelectedPrn(
                  selectedPrn.filter((item) => {
                    return item.id !== itemToRemove.id;
                  })
                );
                setvalueChanged(!valueChanged);
              }}
              type={"PRN"}
              data={item.item}
            />
          )}
        />
      </View>

      <View style={{ backgroundColor: "#fff" }}>
        <KpaPayButton
          onPress={() => {
            if (!selectedPrn.length) {
              console.log("Nothing is selected");
              return;
            }

            navigation.navigate("Summary", {
              data: selectedPrn,
              total: total,
              type: "PRN",

              description: {
                referenceNo: selectedPrn.referenceNo,
                currency: currency,
                amount: total,
              },
            });
          }}
          leftText={"CONTINUE"}
          rightText={total.toLocaleString()}
          currency={currency}
          isDisabled={selectedPrn.length ? false : true}
        />
      </View>
    </View>
  );
}
