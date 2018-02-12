import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Route from './Route';
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Route />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
});
