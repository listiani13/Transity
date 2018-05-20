// @flow

import React, {Component} from 'react';
import {
  AsyncStorage,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';
import {SimpleLineIcons} from '@expo/vector-icons';
import {
  MenuContext,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
// $FlowFixMe
import {NavigationActions} from 'react-navigation';
import {Text} from '../../components/CoreComponents';
import FloatingButton from './components/FloatingButton';
import Trip from './components/Trip';

import {baseColors, BACKGROUND_GREY} from '../../constants/colors';
import {baseTextStyle} from '../../constants/text';

import type {TripDatum} from '../../types';

type Props = {
  navigation: NavigationObject,
};

type State = {
  data: Array<TripDatum>,
};

const PADDING_HORIZONTAL = 10;

export default class HomeScene extends Component<Props, State> {
  static navigationOptions: ({navigation: NavigationObject}) => Object = ({
    navigation,
  }) => {
    const {params = {}} = navigation.state;
    return {
      headerTitle: 'My Trips',
      headerStyle: {
        paddingLeft: 10,
        backgroundColor: '#E0A21F',
        borderBottomColor: 'transparent',
      },
      headerTintColor: 'white',
      headerRight: (
        <View>
          <MenuContext
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: PADDING_HORIZONTAL,
            }}
          >
            <TouchableOpacity onPress={params.logout}>
              <Text style={{color: 'white'}}>Sign Out</Text>
              {/* <Menu style={{zIndex: 99}}>
                <MenuTrigger style={{zIndex: 99}}>
                  <View style={{width: 80, alignItems: 'flex-end'}}>
                    <SimpleLineIcons
                      name="options-vertical"
                      size={baseTextStyle.LARGE_FONT_SIZE}
                      color={baseColors.white}
                    />
                  </View>
                </MenuTrigger>
                <MenuOptions style={{zIndex: 99}}>
                  <MenuOption onSelect={params.logout} text="Log Out" />
                </MenuOptions>
              </Menu> */}
            </TouchableOpacity>
          </MenuContext>
        </View>
      ),
    };
  };
  componentDidMount() {
    console.log('did mount');
    InteractionManager.runAfterInteractions(() => {
      this.props.navigation.setParams({logout: this._logout});
    });
    this._getInitialState();
  }

  _logout = () => {
    AsyncStorage.getItem('username').then((data) => {
      if (data != null) {
        AsyncStorage.removeItem('username').then((error) => {
          if (error == null) {
            const resetAction = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({
                  routeName: 'Login',
                }),
              ],
            });
            this.props.navigation.dispatch(resetAction);
          }
        });
      }
    });
  };

  state = {
    data: [],
  };

  // _getInitialState = () => {
  //   // this.props.navigation.setParams({logout: this._logout});
  //   AsyncStorage.getItem('myTrip').then((data) => {
  //     if (data != null) {
  //       data = JSON.parse(data);
  //     } else {
  //       data = [];
  //     }
  //     let newTrip: Array<TripDatum> = data.map((data, index) => {
  //       return {
  //         id: index.toString(),
  //         title: data.name,
  //         isOpen: false,
  //         sight: data.route.length,
  //         route: data.route,
  //       };
  //     });
  //     this.setState({data: newTrip});
  //   });
  // };
  _getInitialState = async () => {
    console.log('getInitialState');
    // this.props.navigation.setParams({logout: this._logout});
    let myTrip = await AsyncStorage.getItem('myTrip');
    if (myTrip != null) {
      myTrip = JSON.parse(myTrip);
    } else {
      myTrip = [];
    }
    let newTrip: Array<TripDatum> = myTrip.map((data, index) => {
      return {
        id: index.toString(),
        title: data.name,
        isOpen: false,
        sight: data.route.length,
        route: data.route,
      };
    });
    this.setState({data: newTrip});
  };

  _onToggleRoute = (id) => {
    let {data} = this.state;
    let newData = [...data];
    for (let datum of newData) {
      if (datum.id === id) {
        datum.isOpen = !datum.isOpen;
      }
    }
    this.setState({data: newData}, console.log('newData', newData));
  };
  render() {
    let {data} = this.state;
    return (
      <View style={styles.container}>
        <ScrollView width="100%" contentContainerStyle={{padding: 10}}>
          {data.map((item, id) => {
            return (
              <Trip
                key={id}
                title={item.title}
                sights={item.sight}
                isOpen={item.isOpen}
                onToggleRoute={() => this._onToggleRoute(item.id)}
                routeData={item.route}
              />
            );
          })}
        </ScrollView>
        <FloatingButton
          onPress={() => this.props.navigation.navigate('AddNewTrip')}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_GREY,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  card: {backgroundColor: baseColors.white, marginBottom: 20},
  titleContainer: {
    padding: PADDING_HORIZONTAL,
  },
  footer: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: baseColors.grey,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  footerIconText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 'auto',
  },
  // auto because: https://www.w3.org/TR/2012/CR-css3-flexbox-20120918/#auto-margins,
  icon: {marginRight: 10},
});
