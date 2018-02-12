import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default class Tab1 extends React.Component {
  static navigationOptions = {
    headerTitle: 'My Trips',
    headerLeft: <Ionicons name="md-menu" size={20} color="white" />,
    headerStyle: {paddingLeft: 10, backgroundColor: '#E0A21F'},
    headerTintColor: 'white',
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text>Tab 1</Text>
            <Button
              onPress={() => {
                this.props.navigation.navigate('Detail1');
              }}
              title="Go To Detail 1"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
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
