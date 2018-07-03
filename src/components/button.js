// @flow

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {baseColors} from '../constants/colors';
import {baseTextStyle} from '../constants/text';

type Props = {
  onPress?: Function,
  textVal: string,
  style?: StyleSet,
};
export default function Button(props: Props) {
  let {textVal, onPress, style} = props;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btnLogin, style]}>
      <View>
        <Text style={styles.txtLogin}>{textVal}</Text>
      </View>
    </TouchableOpacity>
  );
}

let styles = StyleSheet.create({
  btnLogin: {
    backgroundColor: baseColors.yellow,
    borderRadius: 3,
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtLogin: {
    color: baseColors.white,
    fontWeight: 'bold',
    fontSize: baseTextStyle.HEADING2_SIZE,
  },
});
