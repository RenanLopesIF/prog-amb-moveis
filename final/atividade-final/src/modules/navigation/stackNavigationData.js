import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import HomeScreen from '../home/HomeViewContainer';
import { colors, fonts } from '../../styles';
import TabNavigator from './MainTabNavigator';

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

const headerBackground = require('../../../assets/images/topBarBg.png');

const StackNavigationData = [
  {
    name: 'Chat',
    component: HomeScreen,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'React Native Starter',
    component: TabNavigator,
    headerLeft: null,
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
