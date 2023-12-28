import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import HomeScreen from '../home/HomeViewContainer';
import SettingsScreen from '../settings/ComponentsViewContainer';
import { colors, fonts } from '../../styles';
import TabNavigator from './MainTabNavigator';
import AS from '@react-native-async-storage/async-storage';

const headerLeftComponent = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
    >
      <Image
        source={require('../../../assets/images/icons/arrow-back.png')}
        resizeMode="contain"
        style={{
          height: 20,
        }}
      />
    </TouchableOpacity>
  );
};
const headerLeftInitial = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    (async () => {
      const userData = await AS.getItem('userData');
      setUserData(userData);
      setIsLoading(false);
    })();
  }, []);

  return isLoading ? (
    <></>
  ) : userData ? (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
    >
      <Image
        source={require('../../../assets/images/icons/arrow-back.png')}
        resizeMode="contain"
        style={{
          height: 20,
        }}
      />
    </TouchableOpacity>
  ) : (
    <></>
  );
};

const headerBackground = require('../../../assets/images/topBarBg.png');

const StackNavigationData = [
  {
    name: 'Chat',
    component: HomeScreen,
    // headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Configurações',
    component: SettingsScreen,
    headerLeft: headerLeftInitial,
    // headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  // },
  // {
  //   name: 'Charts',
  //   component: AvailableInFullVersion,
  //   headerLeft: headerLeftComponent,
  //   headerBackground: { source: headerBackground },
  //   headerTitleStyle: {
  //     fontFamily: fonts.primaryRegular,
  //     color: colors.white,
  //     fontSize: 18,
  //   },
  // },
];

export default StackNavigationData;
