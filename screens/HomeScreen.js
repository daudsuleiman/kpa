import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import AuthContext from "../apps/auth/context";
import Details from "../apps/components/Details";
import KoodiText from "../apps/components/KoodiText";
import ListItem from "../apps/components/ListItem";
import Profile from "../apps/components/Profile";
import Screen from "../apps/components/TabScreen";
import colors from "../apps/configs/colors";

function HomeScreen() {
  const { user } = useContext(AuthContext)
  return (
    <Screen>
      <View style={{backgroundColor:colors.white,width:'100%', height:'100%'}}>
      <View style={styles.tagin}><KoodiText style={styles.tag}>Profile</KoodiText></View>
        <View style={styles.imageCont}>
          <Profile imageUri={user.profile}/>
        </View>
        <View style={styles.info}>
          <Details description={`Name: ${user.username}`}/>
          <Details description={`Phone: ${user.phone}`}/>
          <Details description={`Role: ${user.role}`}/>
        </View>
        <View style={styles.email}>
          <ListItem icon={'email'} placeholder={user.email}/>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  tagin:{
    padding:16,
  },
  tag:{
    margin:3,
    fontSize:25,
    color:colors.darkGray,
    fontWeight:'bold'
    
  },
  email:{
    marginTop:16,
    margin:6,
    borderRadius:3
  },
  info: {
    marginTop:16,
    marginBottom:6,
    borderRadius:3,
    margin:6,
    overflow:'hidden'
  },
  imageCont: {
    padding: 6,
  },
});

export default HomeScreen;
