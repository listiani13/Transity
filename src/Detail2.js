import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

export default class Detail2 extends React.Component {
  render() {
    let {navigation: {state: {params: {value}}}} = this.props;
    return (
      <View style={styles.container}>
        <Text>Hi, {value}</Text>
        <Button
          onPress={() => {
            this.props.navigation.goBack();
          }}
          title="Go Back"
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
