// @flow
import React from 'react';
import {TouchableNativeFeedback, View, StyleSheet} from 'react-native';
import {Text} from '../../../components/CoreComponents';
import {MaterialIcons} from '@expo/vector-icons';
import Swipeable from 'react-native-swipeable';
import Card from '../../../components/Card';
import {baseColors} from '../../../constants/colors';
import {baseTextStyle} from '../../../constants/text';

type Props = {
  destName: string,
  onDeletePress: (id: string) => void,
  onEditPress: (id: string) => void,
};
export default function Places(props: Props) {
  let {destName, onEditPress, onDeletePress} = props;
  let iconSize = baseTextStyle.EXTRA_LARGE_FONT_SIZE;
  const rightButtons = [
    <TouchableNativeFeedback key="1" onPress={onEditPress}>
      <View
        style={[{backgroundColor: baseColors.yellow}, styles.swipeableButton]}
      >
        <MaterialIcons name="edit" color="white" size={iconSize} />
      </View>
    </TouchableNativeFeedback>,
    <TouchableNativeFeedback key="1" useForeground onPress={onDeletePress}>
      <View style={[{backgroundColor: 'red'}, styles.swipeableButton]}>
        <MaterialIcons name="delete" color="white" size={iconSize} />
      </View>
    </TouchableNativeFeedback>,
  ];
  return (
    <Swipeable rightButtons={rightButtons}>
      <Card style={styles.container}>
        <Text size="MEDIUM">{destName}</Text>
        <Text>Opening hours: 24 hours</Text>
      </Card>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  swipeableButton: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomColor: baseColors.lightGrey,
    borderRadius: 0,
  },
});
