// @flow
import React, {Component} from 'react';
import {AsyncStorage, View, StyleSheet, Image} from 'react-native';

//$FlowFixMe
import {NavigationActions} from 'react-navigation';
import {Text} from '../../components/CoreComponents';
import {baseColors} from '../../constants/colors';
import travelPicture from '../../assets/planet-earth.png';

type Props = {
  navigation: NavigationObject,
};
type State = {
  login: string,
};
export default class SplashScene extends Component<Props, State> {
  state = {login: ''};
  componentDidMount = () => {
    AsyncStorage.getItem('username').then((data) => {
      if (data != null) {
        this._resetAction('HomeScene');
      } else {
        this._resetAction('Login');
      }
    });
  };
  _resetAction = (scene: string) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: scene,
        }),
      ],
    });
    setTimeout(() => this.props.navigation.dispatch(resetAction), 1000);
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={travelPicture} />
        <Text
          size="HEADING1"
          color={baseColors.white}
          style={{marginTop: 5, fontSize: 60}}
        >
          TRANSITY
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: baseColors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
