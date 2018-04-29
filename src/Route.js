// $FlowFixMe
import {StackNavigator} from 'react-navigation';
import AddNewTrip from './scenes/AddNewTripScene/AddNewTrip';
import Login from './scenes/Login';
import MyTrips from './scenes/MyTripsScene';
import RouteScene from './scenes/RouteScene/RouteScene';
import HomeScene from './scenes/HomeScene/HomeScene';

export default StackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },
    HomeScene: {screen: HomeScene},
    MyTrips: {screen: MyTrips},
    AddNewTrip: {screen: AddNewTrip},
    RouteScene: {screen: RouteScene},
  },
  {
    headerMode: 'screen',
    initialRouteName: 'Login',
  },
);
