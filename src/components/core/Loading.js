// @flow
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {baseColors} from '../../constants/colors';

export default function Loading() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={baseColors.yellow} />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
  },
});
