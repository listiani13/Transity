// @flow
import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';

type Props = {};
type State = {value: string};
export default class Tab1 extends Component<Props, State> {
  state = {
    value: '',
  };
  render() {
    let {value} = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          placeholder={'Input sth'}
          onChangeText={(text) => this.setState({value: text})}
        />
        <Button
          onPress={() => {
            this.props.navigation.navigate('Detail2', {value: value});
          }}
          title="Go To Detail 2"
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
