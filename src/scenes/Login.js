// @flow
import React, {Component} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
// $FlowFixMe
import {NavigationActions} from 'react-navigation';
import Button from '../components/button';

type Props = {
  navigation: Object,
};
type State = {};
export default class Login extends Component<Props, State> {
  _resetAction = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'MyTrips'})],
    });
    this.props.navigation.dispatch(resetAction);
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.loginHeading1Text}>Welcome Back!</Text>
          <Text style={styles.loginHeading2Text}>Sign in to continue</Text>
        </View>
        <View style={styles.body}>
          <TextInput
            placeholder={'Username'}
            style={styles.txtInput}
            underlineColorAndroid="transparent"
          />
          <TextInput
            placeholder={'Password'}
            style={styles.txtInput}
            underlineColorAndroid="transparent"
          />
          <Button onPress={this._resetAction} textVal="LOGIN" />
        </View>
        <Image
          source={require('../img/login-plane.png')}
          style={{
            width: 150,
            height: 150,
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEB83E',
    justifyContent: 'flex-start',
    marginTop: 23,
  },
  loginHeading1Text: {
    fontSize: 30,
    color: 'white',
    marginBottom: 5,
  },
  loginHeading2Text: {
    fontSize: 14,
    color: 'white',
  },
  head: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 20,
  },
  body: {
    flex: 2,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  txtInput: {
    backgroundColor: 'white',
    width: '100%',
    height: 40,
    padding: 10,
    marginBottom: 20,
    borderRadius: 3,
  },
  btnLogin: {
    backgroundColor: '#E0A21F',
    borderRadius: 3,
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtLogin: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
