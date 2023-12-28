import HomeScreen from '../home/HomeViewContainer';
import SettingsScreen from '../home/HomeViewContainer';

const iconHome = require('../../../assets/images/tabbar/home.png');

const tabNavigationData = [
  {
    name: 'Chat',
    component: HomeScreen,
    icon: iconHome,
  },
  {
    name: 'Settings',
    component: SettingsScreen,
    icon: iconHome,
  },
];

export default tabNavigationData;
