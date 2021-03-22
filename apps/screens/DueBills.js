import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import KpaPayButton from "../components/KpaPayButton";
import SelectableOpenBill from "../components/SelectableOpenBill";

export default function DueBills({ navigation }) {
  const [selectedPrn, setSelectedPrn] = useState([]);
  const [valueChanged, setvalueChanged] = useState(false);
  const [total, setTotal] = useState(0.0);

  useEffect(() => {
    let sum = 0.0;

    selectedPrn.map((item) => {
      sum = parseFloat(sum) + parseFloat(item.amount);
      return sum;
    });

    setTotal(sum);
  }, [valueChanged]);

  const dueBills = [
    {
      prn: "0123456789",
      due: "21 / 03 / 2021",
      amount: "2000",
      currency: "KES",
      id: 0,
    },
    {
      prn: "0123456789",
      due: "21 / 04 / 2021",
      amount: "9000",
      currency: "KES",
      id: 1,
    },
    {
      prn: "0123456789",
      due: "21 / 04 / 2021",
      amount: "14000",
      currency: "KES",
      id: 2,
    },
    {
      prn: "0123456789",
      due: "21 / 06 / 2021",
      amount: "23000",
      currency: "KES",
      id: 3,
    },
    {
      prn: "0123456789",
      due: "21 / 07 / 2021",
      amount: "1000",
      currency: "KES",
      id: 4,
    },
    {
      prn: "0123456789",
      due: "21 / 08 / 2021",
      amount: "43000",
      currency: "KES",
      id: 5,
    },
    {
      prn: "0123456789",
      due: "21 / 09 / 2021",
      amount: "30000",
      currency: "KES",
      id: 6,
    },
    {
      prn: "0123456789",
      due: "21 / 10 / 2021",
      amount: "32000",
      currency: "KES",
      id: 7,
    },
    {
      prn: "0123456789",
      due: "21 / 11 / 2021",
      amount: "12000",
      currency: "KES",
      id: 8,
    },
    {
      prn: "0123456789",
      due: "21 / 12 / 2021",
      amount: "23000",
      currency: "KES",
      id: 9,
    },
    {
      prn: "0123456789",
      due: "21 / 01 / 2022",
      amount: "53000",
      currency: "KES",
      id: 10,
    },
    {
      prn: "0123456789",
      due: "21 / 02 / 2021",
      amount: "24000",
      currency: "KES",
      id: 11,
    },
    {
      prn: "0123456789",
      due: "21 / 02 / 2022",
      amount: "17000",
      currency: "KES",
      id: 12,
    },
    {
      prn: "0123456789",
      due: "21 / 01 / 2021",
      amount: "49000",
      currency: "KES",
      id: 13,
    },
  ];

  return (
    <View style={{ flexGrow: 1, backgroundColor: "#FFFFFF" }}>
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
            });
          }}
          leftText={"CONTINUE"}
          rightText={total.toLocaleString()}
          currency={"KES"}
          isDisabled={selectedPrn.length ? false : true}
        />
      </View>
    </View>
  );
}
