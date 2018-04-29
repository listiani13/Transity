// @flow

import React, {Component} from 'react';
import {TouchableOpacity, View, StyleSheet, ScrollView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import Card from '../../components/Card';
import {Text} from '../../components/CoreComponents';
import Destination from './components/Destination';
import FloatingButton from './components/FloatingButton';
import Trip from './components/Trip';

import {baseColors, BACKGROUND_GREY} from '../../constants/colors';
import {baseTextStyle} from '../../constants/text';

type Props = {
  navigation: Navigation,
};

type DestDatum = {
  placeName: string,
  placeDesc: string,
  travelTime?: string,
};
export type RouteData = Array<DestDatum>;
type TripDatum = {
  id: string,
  title: string,
  isOpen: boolean,
  sight: number,
  route: RouteData,
};
type State = {
  data: Array<TripDatum>,
};

const PADDING_HORIZONTAL = 10;

export default class HomeScene extends Component<Props, State> {
  static navigationOptions = {
    headerTitle: 'My Trips',
    headerStyle: {
      paddingLeft: 10,
      backgroundColor: '#E0A21F',
      borderBottomColor: 'transparent',
    },
    headerTintColor: 'white',
  };
  state = {
    data: [
      {
        id: '201',
        title: 'Trip dari mata turun ke hati',
        sight: 2,
        isOpen: false,
        route: [
          {placeName: 'Ngurah Rai', placeDesc: 'Starting Point'},
          {placeName: 'Taman Ayun', placeDesc: 'Nice', travelTime: '20 mins'},
          {placeName: 'Tanah Lot', placeDesc: '', travelTime: '70 mins'},
          {placeName: 'Ngurah Rai', placeDesc: '', travelTime: '80 mins'},
        ],
      },
      {
        id: '202',
        title: 'Choi Seung Hyun',
        sight: 1,
        isOpen: false,
        route: [
          {placeName: 'Ngurah Rai', placeDesc: 'Starting Point'},
          {placeName: 'Taman Ayun', placeDesc: 'Nice', travelTime: '20 mins'},
          {placeName: 'Ngurah Rai', placeDesc: '', travelTime: '80 mins'},
        ],
      },
    ],
  };

  _onToggleRoute = (id) => {
    let newData = [...this.state.data];
    for (let datum of newData) {
      if (datum.id === id) {
        datum.isOpen = !datum.isOpen;
      }
    }

    this.setState({data: newData});
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
