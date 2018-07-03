// @flow
import React, {Component} from 'react';
import {
  AsyncStorage,
  Alert,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';
// $FlowFixMe
import {NavigationActions} from 'react-navigation';
import {Text, Loading} from '../../components/CoreComponents';
import FloatingButton from '../../components/FloatingButton.js';
import Places from './components/Places';

import {baseColors} from '../../constants/colors';
import {SERVER_NAME} from '../../data/config';
import convertArrayToMap from '../../helpers/convertArrayToMap';

type Props = {
  navigation: NavigationObject,
};
export type Place = {
  destID: string,
  destName: string,
  lat: string,
  lng: string,
};
type State = {places: Array<Place>, isLoading: boolean};
export default class AdminHomeScene extends Component<Props, State> {
  static navigationOptions: ({navigation: NavigationObject}) => Object = ({
    navigation,
  }) => {
    const {params = {}} = navigation.state;
    return {
      headerTitle: 'Places',
      headerStyle: {
        paddingLeft: 10,
        backgroundColor: '#E0A21F',
        borderBottomColor: 'transparent',
      },
      headerTintColor: 'white',
      headerRight: (
        <View style={{paddingHorizontal: 20}}>
          <TouchableOpacity onPress={params.logout}>
            <Text style={{color: 'white'}}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      ),
    };
  };
  state = {
    places: [],
    isLoading: true,
  };
  _getInitialState = async () => {
    try {
      let data = await fetch(`${SERVER_NAME}/admin/select_destinations.php`);
      let jsonData = await data.json();
      let filteredData = jsonData.map((data) => {
        return {
          destID: data.dest_id,
          destName: data.dest_name,
          lat: data.lat,
          lng: data.lng,
        };
      });
      this.setState({places: filteredData, isLoading: false});
    } catch (error) {
      // TODO: Show message if error occured
    }
  };
  _onEditPress = (destID: string) => {
    let {places} = this.state;
    let mapPlaces = convertArrayToMap(places, 'destID');
    let place = mapPlaces.get(destID);
    this.props.navigation.navigate('AddNewPlaceScene', {place});
  };
  _deleteItem = async (destID: string) => {
    let raw = await fetch(`${SERVER_NAME}/admin/delete_destinations.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({dest_id: destID}),
    });
    let status = await raw.json();

    if (status.status === 'OK') {
      this._getInitialState();
    }
  };
  _onDeletePress = (destID: string) => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this destination?',
      [
        {
          text: 'Yes',
          onPress: () => this._deleteItem(destID),
        },
        {
          text: 'No',
          onPress: () => {},
        },
      ],
      {
        cancelable: false,
      },
    );
  };
  componentDidMount = () => {
    InteractionManager.runAfterInteractions(() => {
      this.props.navigation.setParams({logout: this._logout});
    });
    this._getInitialState();
  };
  _logout = () => {
    AsyncStorage.getItem('username').then((data) => {
      if (data != null) {
        AsyncStorage.multiRemove(['username', 'myTrip']).then((error) => {
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
  render() {
    let {places, isLoading} = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          {isLoading ? (
            <Loading />
          ) : (
            places
              .slice(0)
              .reverse()
              .map((data) => {
                return (
                  <Places
                    destName={data.destName}
                    key={data.destID}
                    onDeletePress={() => {
                      this._onDeletePress(data.destID);
                    }}
                    onEditPress={() => {
                      this._onEditPress(data.destID);
                    }}
                  />
                );
              })
          )}
        </ScrollView>
        <FloatingButton
          onPress={() => this.props.navigation.navigate('AddNewPlaceScene')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: baseColors.grey,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});
