// @flow
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Ionicons, EvilIcons} from '@expo/vector-icons';
import {Text} from '../../components/CoreComponents';

type Props = {
  iconName: 'ion' | 'evil',
  iconTitle: string,
  textVal: string,
  iconSize: number,
};
export default function IconText(props: Props) {
  let {iconName, iconTitle, textVal, iconSize} = props;
  let component;
  switch (iconName) {
    case 'evil':
      component = (
        <EvilIcons name={iconTitle} size={iconSize} style={styles.icon} />
      );
      break;
    case 'ion':
    default:
      component = (
        <Ionicons name={iconTitle} size={iconSize} style={styles.icon} />
      );
  }
  return (
    <View style={styles.IconText}>
      {component}
      <Text>{textVal}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  IconText: {flexDirection: 'row', justifyContent: 'space-between'},
  icon: {marginRight: 10},
});
