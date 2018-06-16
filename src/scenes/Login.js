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
} from 'react-native';
// $FlowFixMe
import {NavigationActions} from 'react-navigation';
import Button from '../components/button';
import {Loading} from '../components/CoreComponents';
import {SERVER_NAME} from '../data/config';

type Props = {
  navigation: Object,
};
type State = {
  username: string,
  password: string,
  isLoading: boolean,
};

export default class Login extends Component<Props, State> {
  state = {username: '', password: '', isLoading: false};
  _displayErrorMessage = (title: string, message: string) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'OK',
          onPress: () => {
            this.setState({isLoading: false});
          },
        },
      ],
      {
        cancelable: false,
      },
    );
  };
  _getLoginData = async () => {
    let {username, password} = this.state;
    let body = {username, password};

    try {
      this.setState({isLoading: true});
      let data = await fetch(`${SERVER_NAME}/Login.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      let jsonData = await data.json();

      if (jsonData.status === 'OK') {
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('role', jsonData.role);
        await AsyncStorage.setItem('myTrip', jsonData.routeList);
        jsonData.role === 'USER'
          ? this._resetAction('HomeScene')
          : this._resetAction('AdminHomeScene');
      } else {
        this._displayErrorMessage(
          'Login Failed',
          'Username and password did not match!',
        );
      }
    } catch (error) {
      this._displayErrorMessage('Login Failed', error.message);
    }
  };
  _resetAction = (routeName: string) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName})],
    });
    this.props.navigation.dispatch(resetAction);
  };

  _saveData = (val, inputName) => {
    this.setState({[inputName]: val});
  };
  render() {
    let loading;
    if (this.state.isLoading === true) {
      loading = <Loading />;
    }

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
          <Button onPress={this._getLoginData} textVal="LOGIN" />
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
        {loading}
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
