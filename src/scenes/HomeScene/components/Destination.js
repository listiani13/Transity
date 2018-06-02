// @flow
import React from 'react';
import {Text} from '../../../components/CoreComponents';
import {baseColors} from '../../../constants/colors';
import {baseTextStyle} from '../../../constants/text';
import {View, StyleSheet} from 'react-native';

import {MaterialCommunityIcons} from '@expo/vector-icons';

type Props = {
  id: number,
  placeName: string,
  placeDesc: string,
  travelTime?: ?number,
};
const WIDTH = 20;
const MARGIN_RIGHT = 10;
export default function Destination(props: Props) {
  let {id, placeName, placeDesc, travelTime} = props;
  let index = id + 1;
  let backgroundColor = baseColors.lightGrey;
  if (index % 2 === 0) {
    backgroundColor = baseColors.white;
  }
  return (
    <View style={[styles.outterContainer, {backgroundColor}]}>
      {travelTime != null ? (
        <View style={styles.travelTime}>
          <MaterialCommunityIcons
            name="car"
            size={baseTextStyle.DEFAULT_FONT_SIZE}
            style={{marginRight: MARGIN_RIGHT / 2}}
          />
          <Text size="SMALL">{travelTime.toFixed() + ' min'}</Text>
        </View>
      ) : (
        <View />
      )}
      <View style={styles.container}>
        <View>
          <View>
            <View style={styles.destContainer}>
              <Text size="EXTRA_SMALL">{index}</Text>
            </View>
            <View style={styles.separator} />
          </View>
        </View>
        <View style={{alignSelf: 'flex-start'}}>
          <Text>{placeName}</Text>
          <Text size="SMALL">{placeDesc}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outterContainer: {
    paddingTop: 7,
    paddingHorizontal: 10,
  },
  container: {flexDirection: 'row', alignItems: 'center'},
  destContainer: {
    borderRadius: WIDTH / 2,
    width: WIDTH,
    height: WIDTH,
    borderWidth: 1,
    marginRight: MARGIN_RIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: baseColors.yellow,
    elevation: 1,
    shadowColor: baseColors.black,
    shadowOpacity: 0.5,
    shadowOffset: {width: 2, height: 5},
  },
  separator: {
    backgroundColor: baseColors.yellow,
    width: 1,
    height: 40,
    marginLeft: WIDTH / 2,
  },
  travelTime: {flexDirection: 'row', alignItems: 'center', paddingBottom: 5},
});
