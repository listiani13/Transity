// @flow

import React from 'react';
import {Text as BaseText, StyleSheet} from 'react-native';

import getFontSize from '../../helpers/getFontSize';
import {baseColors} from '../../constants/colors';

import type {Node} from 'react';

type OnPressFunc = (param?: mixed) => void;
type Props = {
  size?: 'DEFAULT'
    | 'EXTRA_SMALL'
    | 'SMALL'
    | 'MEDIUM'
    | 'LARGE'
    | 'EXTRA_LARGE'
    | 'POINTER'
    | 'YEAR',
  bold?: boolean,
  children?: Node,
  color?: string,
  style?: StyleSet,
  onPress?: OnPressFunc,
  grey?: boolean,
};

export default function Text(props: Props) {
  let {bold, children, color, style, grey, size, ...rest} = props;
  let fontSize = getFontSize(size);
  return (
    <BaseText
      {...rest}
      style={[
        styles.defaultText,
        {fontSize, color},
        style,
        bold && styles.bold,
        grey && styles.grey,
      ]}
    >
      {children}
    </BaseText>
  );
}

const styles = StyleSheet.create({
  defaultText: {
    color: baseColors.black,
  },
  bold: {
    fontWeight: 'bold',
  },
  grey: {
    color: '#808080',
  },
});
