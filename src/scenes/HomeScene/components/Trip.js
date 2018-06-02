// @flow
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Card from '../../../components/Card';
import {Text} from '../../../components/CoreComponents';
import {baseTextStyle} from '../../../constants/text';
import {baseColors} from '../../../constants/colors';
import Destination from './Destination';

import type {RouteData} from '../../../types';
type Props = {
  title: string,
  sights: string | number,
  onToggleRoute: Function,
  isOpen: boolean,
  routeData: RouteData,
};

const PADDING_HORIZONTAL = 10;
export default function Trip(props: Props) {
  let {title, sights, isOpen, onToggleRoute, routeData} = props;
  let iconToggle = 'ios-arrow-down';
  if (isOpen) {
    iconToggle = 'ios-arrow-up';
  }
  if (!isOpen) {
    routeData = [];
  }
  return (
    <Card style={styles.card}>
      <View style={styles.titleContainer}>
        <Text size="MEDIUM">{title}</Text>
        <Text size="EXTRA_SMALL" color={baseColors.grey}>
          {sights} sights
        </Text>
      </View>
      <TouchableOpacity onPress={onToggleRoute}>
        <View style={styles.footer}>
          <View style={styles.footerIconText}>
            <Ionicons
              name="md-information-circle"
              size={baseTextStyle.DEFAULT_FONT_SIZE}
              style={styles.icon}
              color={baseColors.darkGrey}
            />
            <Text color={baseColors.darkGrey}>Tap to see more</Text>
          </View>
          <Ionicons
            name={iconToggle}
            size={baseTextStyle.LARGE_FONT_SIZE}
            color={baseColors.darkGrey}
          />
        </View>
      </TouchableOpacity>
      {routeData.map((item, id) => {
        let {placeName, placeDesc} = item;
        let node =
          item.travelTime != null ? (
            <Destination
              placeName={placeName}
              placeDesc={placeDesc}
              travelTime={item.travelTime}
              id={id}
              key={id}
            />
          ) : (
            <Destination
              placeName={item.placeName}
              placeDesc={item.placeDesc}
              id={id}
              key={id}
            />
          );
        return node;
      })}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {backgroundColor: baseColors.white, marginBottom: 20},
  titleContainer: {
    padding: PADDING_HORIZONTAL,
  },
  footer: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: baseColors.grey,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  footerIconText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 'auto',
  },
  // auto because: https://www.w3.org/TR/2012/CR-css3-flexbox-20120918/#auto-margins,
  icon: {marginRight: 10},
});
