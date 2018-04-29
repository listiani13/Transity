// @flow

import React from 'react';
import {View, StyleSheet} from 'react-native';

import {DEFAULT_BORDER_COLOR} from '../../constants/colors';

type Props = {
  direction?: 'HORIZONTAL' | 'VERTICAL',
  style?: StyleSet,
};

export default function Separator(props: Props) {
  let direction;
  switch (props.direction) {
    case 'HORIZONTAL':
      direction = styles.horizontal;
      break;
    case 'VERTICAL':
      direction = styles.vertical;
      break;
    default:
      direction = styles.horizontal;
  }
  return <View style={[styles.container, direction, props.style]} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: DEFAULT_BORDER_COLOR,
  },
  horizontal: {
    maxHeight: 0,
    borderTopWidth: StyleSheet.hairlineWidth * 2,
  },
  vertical: {
    maxWidth: 0,
    borderLeftWidth: StyleSheet.hairlineWidth * 2,
  },
});
