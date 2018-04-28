// $FlowFixMe
import {StackNavigator} from 'react-navigation';
import AddNewTrip from './scenes/AddNewTrip';
import Detail1 from './Detail1';
import Detail2 from './Detail2';
import Login from './Login';
import MyTrips from './scenes/MyTripsScene';
import RouteScene from './scenes/RouteScene';

// const TabsRoute = TabNavigator(
//   {
//     Tab1: {screen: Tab1},
//     Tab2: {screen: Tab2},
//     Tab3: {screen: Tab3},
//   },
//   {
//     animationEnabled: false,
//   },
// );
export default StackNavigator(
  {
    MyTrips: {screen: MyTrips},
    AddNewTrip: {screen: AddNewTrip},
    RouteScene: {screen: RouteScene},
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },
    Detail1: {screen: Detail1},
    Detail2: {screen: Detail2},
  },
  {
    headerMode: 'screen',
    initialRouteName: 'Login',
  },
);
