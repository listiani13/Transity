// @flow
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from '../../components/CoreComponents';
type RouteData = {
  route: Array<string>,
  name: string,
};
type Props = {
  name: string,
  navigation: NavigationObject,
  data: RouteData,
};
export default function TripContainer(props: Props) {
  let {name, navigation, data} = props;
  return (
    <TouchableOpacity
      style={styles.tripContainer}
      onPress={() =>
        navigation.navigate('RouteScene', {
          destination: data.route,
          tripName: data.name,
          from: 'tripContainer',
        })
      }
    >
      <View style={{flex: 1}}>
        <View style={styles.circleBorder}>
          <Text bold grey>
            20
          </Text>
          <Text bold grey>
            June
          </Text>
        </View>
      </View>

      <View style={{flex: 3.5, justifyContent: 'center'}}>
        <View style={{marginBottom: 2}}>
          <Text bold grey>
            {name}
          </Text>
        </View>
        <View style={{height: 40}}>
          <Text style={styles.descriptionText} size="SMALL">
            Lorem Ipsum has been the industrys standard dummy text ever since...
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tripContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth * 3,
    borderColor: '#e2dcdc',
    paddingVertical: 10,
  },
  circleBorder: {
    borderRadius: 40,
    borderColor: '#E0A21F',
    width: 60,
    height: 60,
    borderWidth: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bold: {
    fontWeight: 'bold',
    color: '#808080',
  },
  descriptionText: {
    // fontSize: 10,
    color: '#808080',
    textAlign: 'justify',
  },
});
