// @flow
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {baseColors} from '../../constants/colors';
import {Text} from '../../components/CoreComponents';

type Props = {
  placeName: string,
  index: number | string,
};

const WIDTH = 40;
export default function Destination(props: Props) {
  let {placeName, index} = props;
  let number = index + 1;
  return (
    <View style={styles.container}>
      <View style={styles.destContainer}>
        <Text>{number}</Text>
      </View>
      <View>
        <Text>{placeName}</Text>
        <Text size="SMALL">Starting Point </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center'},
  destContainer: {
    borderRadius: WIDTH / 2,
    width: WIDTH,
    height: WIDTH,
    borderWidth: 1,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: baseColors.yellow,
    elevation: 1,
    shadowColor: baseColors.black,
    shadowOpacity: 0.5,
    shadowOffset: {width: 2, height: 5},
  },
});
