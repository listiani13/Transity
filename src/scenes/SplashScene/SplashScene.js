// @flow
import React, {Component} from 'react';
import {AsyncStorage, View, StyleSheet} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {Text} from '../../components/CoreComponents';
import {baseColors} from '../../constants/colors';

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
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text size="EXTRA_LARGE" color={baseColors.white}>
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
