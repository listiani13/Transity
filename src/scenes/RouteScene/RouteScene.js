// @flow
import React, {Component} from 'react';
import {
  AsyncStorage,
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
// $FlowFixMe
import {NavigationActions} from 'react-navigation';
import {Loading, Text} from '../../components/CoreComponents';
import Destination from '../components/Destination';
import {baseColors} from '../../constants/colors';
import {Ionicons} from '@expo/vector-icons';
import {SERVER_NAME} from '../../data/config';

import type {RouteData} from '../../types';
type Props = {
  navigation: NavigationObject,
};
type State = {
  destination: RouteData,
  tripName: string,
  tripDate: string,
  isLoading: boolean,
};
const VELOCITY = 40;
export default class RouteScene extends Component<Props, State> {
  static navigationOptions: NavigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      headerTitle: 'My Trips',
      headerRight:
        params.from === 'tripContainer' ? null : (
          <TouchableOpacity>
            <Ionicons
              name="ios-refresh"
              size={35}
              color="white"
              onPress={params.getRoute}
            />
          </TouchableOpacity>
        ),
      headerStyle: {
        backgroundColor: '#E0A21F',
        paddingRight: 20,
        borderBottomColor: 'transparent',
      },
      headerTintColor: 'white',
    };
  };
  // state = {destination: [], tripName: 'Hello', tripDate: ''};
  state = {
    destination: [],
    tripName: '',
    tripDate: '',
    isLoading: false,
  };

  componentDidMount() {
    this._getInitialState();
  }

  _getInitialState = () => {
    let {params} = this.props.navigation.state;
    let {destination, tripName, tripDate} = params;
    this.props.navigation.setParams({
      getRoute: this._getRoute,
    });
    this.setState({
      destination,
      tripName,
      tripDate,
    });
  };

  _getRoute = async () => {
    this.setState({isLoading: true});
    let {params} = this.props.navigation.state;
    let {availTime, numDest} = params;
    try {
      let data = await fetch(
        `${SERVER_NAME}/Generasi.php?availTime=${availTime}&numDest=${numDest}`,
      );
      let jsonData = await data.json();
      let destination = jsonData.destination;
      let destDesc: RouteData = [];
      let idxTravelDistance = 0;
      destination.map((val, idx) => {
        idxTravelDistance = idx - 1;
        if (idx === 0) {
          destDesc.push({
            placeName: val,
            placeDesc: 'Starting Point',
            travelTime: null,
          });
        } else {
          destDesc.push({
            placeName: val,
            placeDesc: jsonData.travel_distance[idxTravelDistance] + ' km',
            travelTime: jsonData.travel_distance / VELOCITY,
          });
        }
      });
      setTimeout(() => {
        this.setState({isLoading: false, destination: destDesc});
      }, 500);
    } catch (error) {
      this._displayErrorMessage('Error Occured', error.message);
    }
  };

  _displayErrorMessage = (title: string, message: string) => {
    Alert.alert(title, message, [{text: 'OK', onPress: () => {}}], {
      cancelable: false,
    });
  };

  _renderItem = ({item, index}) => {
    if (item.travelTime != null) {
      return (
        <Destination
          placeName={item.placeName}
          index={index}
          placeDesc={item.placeDesc}
          placeTime={item.travelTime}
        />
      );
    }
    return (
      <Destination
        placeName={item.placeName}
        index={index}
        placeDesc={item.placeDesc}
      />
    );
  };
  _renderSeparator = () => {
    return (
      <View
        style={
          {
            backgroundColor: baseColors.yellow,
            width: 1,
            height: 30,
            marginLeft: 20,
          } // Destination WIDTH/2
        }
      />
    );
  };
  _resetAction = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'HomeScene'})],
    });
    this.props.navigation.dispatch(resetAction);
  };
  _saveTrip = async () => {
    let {destination, tripName, tripDate} = this.state;
    try {
      let currDest = await AsyncStorage.getItem('myTrip');
      let currentUsername = await AsyncStorage.getItem('username');
      if (currDest != null) {
        currDest = JSON.parse(currDest);
      } else {
        currDest = [];
      }
      currDest.push({
        name: tripName,
        date: tripDate,
        route: destination,
      });
      let updateToDB = await fetch(`${SERVER_NAME}/user/update_routeList.php`, {
        method: 'POST',
        body: JSON.stringify({
          username: currentUsername,
          routeList: JSON.stringify(currDest),
        }),
      });
      let statusUpdate = await updateToDB.json();
      if (statusUpdate.status === 'OK') {
        await AsyncStorage.setItem('myTrip', JSON.stringify(currDest));
        this._resetAction();
      }
    } catch (error) {}
  };

  render() {
    let {destination, isLoading} = this.state;
    let {params} = this.props.navigation.state;
    let from = params ? params.from : null;
    return (
      <View style={{alignItems: 'stretch', flex: 1}}>
        <View
          style={{
            justifyContent: 'flex-start',
            flex: 7,
            alignItems: 'stretch',
          }}
        >
          <FlatList
            data={destination}
            keyExtractor={(_, idx) => idx.toString()}
            renderItem={this._renderItem}
            ItemSeparatorComponent={this._renderSeparator}
            contentContainerStyle={{padding: 20}}
          />
        </View>
        {from == null ? (
          <View style={styles.btnOutterContainer}>
            <TouchableOpacity
              style={styles.btnContainer}
              onPress={this._saveTrip}
            >
              <View>
                <Text style={styles.txtBtnNext}>Save</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
        {isLoading ? <Loading /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: '#E0A21F',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    padding: 5,
  },
  txtBtnNext: {
    fontSize: 18,
    color: 'white',
  },
  btnOutterContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  headerContainer: {
    backgroundColor: baseColors.yellow,
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
