import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

export default class Detail1 extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Detail 1</Text>
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
