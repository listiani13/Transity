// @flow
import React from 'react';
import {Text} from '../../../components/CoreComponents';
import {baseColors} from '../../../constants/colors';
import {
  TouchableOpacity,
  Slider,
  StyleSheet,
  TextInput,
  View,
  Picker,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Entypo} from '@expo/vector-icons';
import {baseTextStyle} from '../../../constants/text';

type Props =
  | {
      index: string,
      type: 'TEXT_INPUT',
      placeholder?: string,
      onChangeText?: Function,
    }
  | {
      index: string,
      type: 'DATEPICKER',
      dateValue?: string,
      placeholder?: string,
      showDateTimePicker: Function,
      isVisible: boolean,
      onConfirm: Function,
      onCancel: Function,
    }
  | {
      index: string,
      type: 'SLIDER',
      label: string,
      availTime: number,
      minVal: number,
      maxVal: number,
      step: number,
      onValueChange: Function,
    }
  | {
      index: string,
      type: 'INDECREASE',
      label: string,
      numDest: number,
      increaseNumDest: Function,
      decreaseNumDest: Function,
    }
  | {
      index: string,
      type: 'DROPDOWN',
      onValueChange: Function,
      selectedValue: string,
    };
export default function FieldForm(props: Props) {
  let {index} = props;
  let inputField = <View />;
  if (props.type === 'TEXT_INPUT') {
    let {placeholder} = props;
    inputField = (
      <View style={styles.inputContainer}>
        <View style={styles.lblTripNameContainer}>
          <Text style={styles.lblTripName}>Trip Name:</Text>
        </View>
        <View style={styles.txtInputTripNameContainer}>
          <TextInput
            placeholder={placeholder}
            style={styles.txtInputTripName}
            onChangeText={props.onChangeText}
            autoCorrect={false}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
    );
  }
  if (props.type === 'DATEPICKER') {
    let {placeholder} = props;
    let {dateValue, showDateTimePicker, isVisible, onConfirm, onCancel} = props;
    inputField = (
      <View style={styles.inputContainer}>
        <View style={styles.lblTripNameContainer}>
          <Text style={styles.lblTripName}>Date:</Text>
        </View>
        <View style={styles.txtInputTripNameContainer}>
          <TouchableOpacity onPress={showDateTimePicker}>
            <TextInput
              placeholder={placeholder}
              style={styles.txtInputTripName}
              onFocus={showDateTimePicker}
              value={dateValue}
              editable={false}
              pointerEvents="none"
            />
          </TouchableOpacity>
          <DateTimePicker
            isVisible={isVisible}
            onConfirm={(date) => onConfirm(date)}
            onCancel={onCancel}
          />
        </View>
      </View>
    );
  }
  if (props.type === 'SLIDER') {
    let {label, availTime, minVal, maxVal, step, onValueChange} = props;
    inputField = (
      <View style={styles.inputContainer}>
        <View style={styles.lblTripNameContainer}>
          <Text style={styles.lblTripName}>
            {label}: {availTime}
          </Text>
        </View>
        <Slider
          minimumValue={minVal}
          maximumValue={maxVal}
          step={step}
          onValueChange={onValueChange}
        />
      </View>
    );
  }
  if (props.type === 'INDECREASE') {
    let {label, decreaseNumDest, increaseNumDest, numDest} = props;
    inputField = (
      <View style={styles.inputContainer}>
        <View style={styles.lblTripNameContainer}>
          <Text style={styles.lblTripName}>
            {label}: {numDest}
          </Text>
        </View>
        <View style={styles.buttonInDecrease}>
          <View style={{marginRight: 20}}>
            <TouchableOpacity
              hitslop={{top: 20, left: 20, right: 20, bottom: 20}}
              onPress={decreaseNumDest}
            >
              <Entypo
                name="circle-with-minus"
                size={baseTextStyle.EXTRA_LARGE_FONT_SIZE}
              />
            </TouchableOpacity>
          </View>
          <Text>{numDest}</Text>
          <View style={{marginLeft: 20}}>
            <TouchableOpacity
              hitslop={{top: 20, left: 20, right: 20, bottom: 20}}
              onPress={increaseNumDest}
            >
              <Entypo
                name="circle-with-plus"
                size={baseTextStyle.EXTRA_LARGE_FONT_SIZE}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  if (props.type === 'DROPDOWN') {
    inputField = (
      <View style={styles.inputContainer}>
        <View style={styles.lblTripNameContainer}>
          <Text style={styles.lblTripName}>Origin:</Text>
        </View>
        <Picker
          selectedValue={props.selectedValue}
          style={{height: 50}}
          onValueChange={props.onValueChange}
        >
          <Picker.Item label="Ngurah Rai" value="ngurah_rai" />
          <Picker.Item label="Current Location" value="current_location" />
        </Picker>
      </View>
    );
  }
  return (
    <View style={styles.fieldContainer}>
      <View style={styles.fieldInnerContainer}>
        <View style={styles.circleNumbering}>
          <Text color={baseColors.white}>{index}</Text>
        </View>
        {inputField}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fieldContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#EFEFEF',
  },
  fieldInnerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleNumbering: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: baseColors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  lblTripNameContainer: {
    marginBottom: 5,
  },
  lblTripName: {
    fontSize: 10,
  },
  txtInputTripNameContainer: {},
  txtInputTripName: {
    borderRadius: 3,
    width: '100%',
    height: 30,
    borderWidth: 1,
    borderColor: '#e2dcdc',
    padding: 5,
  },
  inputContainer: {
    width: '85%',
  },
  buttonInDecrease: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
