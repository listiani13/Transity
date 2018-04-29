// @flow
import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

type Props = {
  onPress: Function,
};
export default function FloatingButton(props: Props) {
  let {onPress} = props;
  return (
    <View style={styles.btnAddNewContainer}>
      <TouchableOpacity style={styles.btnAddNew} onPress={onPress}>
        <Ionicons name="md-add" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnAddNewContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  btnAddNew: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0A21F',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 9,
  },
});
