// @flow
import React, {Component} from 'react';
import {
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import TripContainer from './components/TripContainer';

type Route = {
  name: string,
  route: Array<string>,
};

type Props = {
  navigation: NavigationObject,
};

type State = {
  route: Array<Route>,
};
export default class MyTripsScene extends Component<Props, State> {
  static navigationOptions = {
    headerTitle: 'My Trips',
    headerStyle: {
      paddingLeft: 10,
      backgroundColor: '#E0A21F',
      borderBottomColor: 'transparent',
    },
    headerTintColor: 'white',
  };
  componentDidMount() {
    this._getRoute();
  }
  _getRoute = async () => {
    let myTrip = await AsyncStorage.getItem('myTrip');
    myTrip = JSON.parse(myTrip);
    this.setState({route: myTrip});
  };
  state = {route: []};

  render() {
    let {route} = this.state;
    let tripContainer = (
      <Text>Nothing to show here.. Wanna plan something new?</Text>
    );
    if (route != null && route.length !== 0) {
      tripContainer = route.map((item, idx) => {
        return (
          <TripContainer
            name={item.name}
            data={item}
            navigation={this.props.navigation}
            key={idx}
          />
        );
      });
    }

    return (
      <View style={styles.container}>
        <ScrollView
          width="100%"
          display="flex"
          contentContainerStyle={{
            alignItems: 'flex-start',
            paddingHorizontal: 12,
            paddingTop: 10,
          }}
        >
          {tripContainer}
        </ScrollView>

        <View style={styles.btnAddNewContainer}>
          <TouchableOpacity
            style={styles.btnAddNew}
            onPress={() => this.props.navigation.navigate('AddNewTrip')}
          >
            <Ionicons name="md-add" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnAddNewContainer: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  btnAddNew: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0A21F',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 9,
  },
});
