import {StackNavigator, TabNavigator} from 'react-navigation';
import AddNewTrip from './AddNewTrip';
import Detail1 from './Detail1';
import Detail2 from './Detail2';
import Login from './Login';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';

const TabsRoute = TabNavigator(
  {
    Tab1: {screen: Tab1},
    Tab2: {screen: Tab2},
    Tab3: {screen: Tab3},
  },
  {
    animationEnabled: false,
  },
);
export default StackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },
    Tabs: {screen: TabsRoute},
    Detail1: {screen: Detail1},
    Detail2: {screen: Detail2},
    AddNewTrip: {screen: AddNewTrip},
  },
  {
    headerMode: 'screen',
  },
);
