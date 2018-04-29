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
import {Text} from '../../components/CoreComponents';
import Destination from '../components/Destination';
import {baseColors} from '../../constants/colors';
import {Ionicons} from '@expo/vector-icons';

type Props = {
  navigation: NavigationObject,
};
type State = {
  destination: Array<string>,
  tripName: string,
  tripDate: string,
};
export default class RouteScene extends Component<Props, State> {
  static navigationOptions = ({navigation}) => {
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
  // state = {destination: [], tripName: 'Hello', tripDate: ''};
  state = {
    destination: [
      'Ngurah Rai',
      'Tanah Lot',
      'Taman Ayun',
      'Ngurah Rai',
      'Tanah Lot',
      'Taman Ayun',
    ],
    tripName: 'Hello',
    tripDate: '',
  };

  // componentDidMount() {
  //   this._getInitialState();
  // }
  // _getRoute = async () => {
  //   let {params} = this.props.navigation.state;
  //   let {availTime, numDest} = params;
  //   try {
  //     let data = await fetch(
  //       `http://localhost/ga_test/Generasi.php?availTime=${availTime}&numDest=${numDest}`,
  //     );
  //     let jsonData = await data.json();
  //     let destination = jsonData[1].destinasi;
  //     this.setState({destination});
  //   } catch (error) {
  //     this._displayErrorMessage('Error Occured', error.message);
  //   }
  // };

  _displayErrorMessage = (title: string, message: string) => {
    Alert.alert(title, message, [{text: 'OK', onPress: () => {}}], {
      cancelable: false,
    });
  };

  _renderItem = ({item, index}) => {
    return <Destination placeName={item} index={index} placeDesc={'20mins'} />;
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

  _saveTrip = async () => {
    let {destination, tripName, tripDate} = this.state;
    try {
      let currDest = await AsyncStorage.getItem('myTrip');
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
      // await AsyncStorage.removeItem('myTrip');
      await AsyncStorage.setItem('myTrip', JSON.stringify(currDest));
      this.props.navigation.navigate('MyTrips');
    } catch (error) {}
  };
  render() {
    let {destination} = this.state;
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
