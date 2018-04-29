// @flow
import React from 'react';
import {StyleSheet, View} from 'react-native';
import type {Node} from 'react';

type Props = {
  children: Node,
  style?: StyleSet,
};
export default function Card(props: Props) {
  let {children, style} = props;
  return <View style={[styles.container, style]}>{children}</View>;
}

let styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    elevation: 1,
  },
});
