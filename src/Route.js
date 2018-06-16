// $FlowFixMe
import {StackNavigator} from 'react-navigation';
import AddNewTrip from './scenes/AddNewTripScene/AddNewTrip';
import Login from './scenes/Login';
import MyTrips from './scenes/MyTripsScene';
import RouteScene from './scenes/RouteScene/RouteScene';
import HomeScene from './scenes/HomeScene/HomeScene';
import SplashScene from './scenes/SplashScene/SplashScene';
import AdminHomeScene from './scenes/AdminScenes/AdminHomeScene';
import AddNewPlaceScene from './scenes/AdminScenes/AddNewPlaceScene';

export default StackNavigator(
  {
    SplashScene: {
      screen: SplashScene,
      navigationOptions: {
        header: null,
      },
    },
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
    AdminHomeScene: {screen: AdminHomeScene},
    AddNewPlaceScene: {screen: AddNewPlaceScene},
  },
  {
    headerMode: 'screen',
    initialRouteName: 'SplashScene',
  },
);
