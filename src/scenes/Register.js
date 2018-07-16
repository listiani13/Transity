// @flow
import React, {Component} from 'react';
import {
  Alert,
  AsyncStorage,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  ToastAndroid,
} from 'react-native';

import Button from '../components/button';
import {SERVER_NAME} from '../data/config';
type Props = {
  navigation: NavigationObject,
};
type State = {
  username: string,
  password: string,
};
export default class Register extends Component<Props, State> {
  state = {
    username: '',
    password: '',
  };
  _saveData = (val, inputName) => {
    this.setState({[inputName]: val});
  };
  _register = async () => {
    let {username, password} = this.state;
    if (username !== '' && password !== '') {
      try {
        let body = {username, password};
        let data = await fetch(`${SERVER_NAME}/user/Registration.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        let jsonData = await data.json();
        let {status} = jsonData;
        if (status === 'OK') {
          ToastAndroid.showWithGravity(
            'Your account has been registered.',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          this.props.navigation.navigate('Login');
        }
      } catch (error) {
        console.log('error', error);
      }
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.loginHeading1Text}>Register Yourself!</Text>
          <Text style={styles.loginHeading2Text}>
            One step closer to stress-free trip planning to Bali
          </Text>
        </View>
        <View style={styles.body}>
          <TextInput
            placeholder={'Username'}
            style={styles.txtInput}
            underlineColorAndroid="transparent"
            onChangeText={(val) => this._saveData(val, 'username')}
            autoCapitalize={'none'}
          />
          {/* TODO: Find better way rather than onChange to handle auto complete from google */}
          <TextInput
            placeholder={'Password'}
            style={styles.txtInput}
            underlineColorAndroid="transparent"
            onChangeText={(val) => this._saveData(val, 'password')}
            secureTextEntry={true}
            autoCapitalize={'none'}
          />
          <Button onPress={this._register} textVal="REGISTER" />
        </View>
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
