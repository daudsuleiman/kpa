import React from 'react'
import { StyleSheet,View } from 'react-native'
import colors from '../configs/colors';


function AjiraItemSeparator({ style }) {
    return <View style={[styles.separator, style]} />;
  }
  
  const styles = StyleSheet.create({
    separator: {
      backgroundColor: colors.lightGray,
      width: "100%",
      height: 1,
      alignSelf: "center",
      marginTop: 6,
    },
  });
export default AjiraItemSeparator;