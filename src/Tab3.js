import React from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {NavigationActions} from 'react-navigation';

export default class Tab1 extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => {
            const resetAction = NavigationActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({routeName: 'Login'})],
            });
            this.props.navigation.dispatch(resetAction);
          }}
          title="Logout"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
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
});
