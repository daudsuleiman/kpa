import React,{ useContext } from 'react'
import {SafeAreaView,View,StyleSheet,Image,Text,Linking} from 'react-native';
import {DrawerContentScrollView,DrawerItemList,DrawerItem } from '@react-navigation/drawer';
import colors from '../configs/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AuthContext from '../auth/context';
import authStorage from '../auth/authStorage';
import AjiraText from './AjiraText';

function AjiraDrawer(props){

  const { user,setUser } = useContext(AuthContext)

  const handleLogout = () =>{
    setUser(null);
    authStorage.logOutUser();
  }



return(
    <SafeAreaView style={{flex: 1}}>
      {/*Top Large Image */}
      <Image
        source={{uri: user.picture}}
        style={styles.sideMenuProfileIcon}
      />
    <View style={styles.view}>
    <AjiraText style={styles.ajiratext}>{user.name}</AjiraText>
     <AjiraText style={styles.ajiratext}>{user.email}</AjiraText>
    </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />

        <View style={styles.customItem}>
          <Text
            onPress={handleLogout}>
            logout
          </Text>

          <MaterialCommunityIcons style={styles.iconStyle} name="logout" size={24} color={colors.fadeGray} />
         
        </View>

      </DrawerContentScrollView>


      <Text
      onPress={()=>{
        Linking.openURL('https://www.linkedin.com/in/phenius-muthomi-558aa7142/');
      }}
        style={{
          fontSize: 16,
          textAlign: 'center',
          color: colors.primary
        }}>Privacy and Policy</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  ajiratext:{
    fontSize:14,
    color:colors.darkGray
  },
    sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 250,
    height: 250,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  view:{
    marginLeft:16
  }
});

export default AjiraDrawer;