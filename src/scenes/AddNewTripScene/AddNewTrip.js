// @flow
import React, {Component} from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';

import {Ionicons} from '@expo/vector-icons';

import FieldForm from '../../components/FieldForm';
import {Text} from '../../components/CoreComponents';
import sprintf from '../../helpers/sprintf';
import {SERVER_NAME} from '../../data/config';
type Props = {
  navigation: Navigation,
};
type State = {
  tripName: string,
  tripDate: string,
  availTime: number,
  numDest: number,
  tripDescription: string,
  isDatePickerVisible: boolean,
  isLoading: boolean,
  selectedValue: string,
  startingTime: string,
  isStartingTimeVisible: boolean,
};
const VELOCITY = 40;
export default class AddNewTrip extends Component<Props, State> {
  state: State = {
    tripName: '',
    tripDate: '',
    availTime: 4,
    numDest: 1,
    tripDescription: '',
    isDatePickerVisible: false,
    isLoading: false,
    selectedValue: '',
    startingTime: '',
    isStartingTimeVisible: false,
  };

  static navigationOptions: ({navigation: NavigationObject}) => Object = ({
    navigation,
  }) => {
    return {
      headerTitle: 'Trip Details',
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="ios-arrow-back" size={20} color="white" />
        </TouchableOpacity>
      ),
      headerStyle: {
        paddingLeft: 10,
        backgroundColor: '#E0A21F',
        borderBottomColor: 'transparent',
      },
      headerTintColor: 'white',
    };
  };
  _getRoute = async () => {
    let {
      availTime,
      numDest,
      tripName,
      tripDate,
      selectedValue,
      startingTime,
    } = this.state;

    if (tripName !== '' && tripDate !== '') {
      try {
        this.setState({isLoading: true});
        let latlng = '';
        if (selectedValue === 'current_location') {
          // TODO: Get position from GPS
          latlng = '&lat=-8.634864&lang=115.192476';
        }
        let data = await fetch(
          `${SERVER_NAME}/Generasi.php?availTime=${availTime}&numDest=${numDest}${latlng}&startTime=${startingTime}`,
        );
        let jsonData = await data.json();
        let destination = jsonData.destination;
        let destDesc = [];
        let idxTravelDistance = 0;
        destination.map((val, idx) => {
          idxTravelDistance = idx - 1;
          if (idx === 0) {
            destDesc.push({
              placeName: val,
              placeDesc: 'Starting Point',
              travelTime: null,
            });
          } else {
            destDesc.push({
              placeName: val,
              placeDesc: jsonData.travel_distance[idxTravelDistance] + ' km',
              travelTime:
                jsonData.travel_distance[idxTravelDistance] / VELOCITY * 60,
            });
          }
        });
        this.props.navigation.navigate('RouteScene', {
          destination: destDesc,
          availTime,
          numDest,
          tripName,
          tripDate,
        });
      } catch (error) {
        this._displayErrorMessage('Error Occured', error.message);
      }
    } else {
      this._displayErrorMessage('Warning', 'Please fill all the inputs');
    }
  };
  _displayErrorMessage = (title: string, message: string) => {
    Alert.alert(title, message, [{text: 'OK', onPress: () => {}}], {
      cancelable: false,
    });
  };
  _onChangeText = (val, inputName) => {
    this.setState({[inputName]: val});
  };
  _showDateTimePicker = (inputName) =>
    this.setState({
      [inputName]: true,
    });

  _hideDateTimePicker = (inputName: string) =>
    this.setState({
      [inputName]: false,
    });

  _handleDatePicked = (date, fieldType: 'date' | 'time') => {
    if (fieldType === 'date') {
      let monthNo = date.getMonth() + 1;
      let month = sprintf(monthNo.toString());
      let day = sprintf(date.getDate().toString());
      let year = date.getFullYear();

      let newDateString = day + '/' + month + '/' + year;
      this.setState({tripDate: newDateString});
      this._hideDateTimePicker('isDatePickerVisible');
    }
    if (fieldType === 'time') {
      let hour = sprintf(date.getHours());
      let mins = sprintf(date.getMinutes());
      this.setState({startingTime: hour + ':' + mins});
      this._hideDateTimePicker('isStartingTimeVisible');
    }
  };
  _decreaseNumDest = () => {
    if (this.state.numDest !== 1) {
      let {numDest} = this.state;
      numDest = numDest - 1;
      this.setState({numDest});
    }
  };
  _increaseNumDest = () => {
    let {availTime, numDest} = this.state;
    if (numDest !== Math.floor(availTime / 2)) {
      numDest++;
      this.setState({numDest});
    }
  };
  render() {
    let {tripDate, startingTime} = this.state;
    return (
      <View style={styles.container}>
        <View>
          <FieldForm
            index="1"
            title="Trip Name"
            type="TEXT_INPUT"
            placeholder="Trip Name"
            onChangeText={(text) => {
              this._onChangeText(text, 'tripName');
            }}
          />
          <FieldForm
            index="2"
            type="DATETIMEPICKER"
            placeholder="Date"
            dateValue={tripDate}
            showDateTimePicker={() => {
              this._showDateTimePicker('isDatePickerVisible');
            }}
            isVisible={this.state.isDatePickerVisible}
            onConfirm={(date) => this._handleDatePicked(date, 'date')}
            onCancel={() => this._hideDateTimePicker('isDatePickerVisible')}
          />
          <FieldForm
            index="3"
            type="SLIDER"
            label="Availability Time"
            availTime={this.state.availTime}
            minVal={4}
            maxVal={12}
            step={1}
            onValueChange={(val: number) => this.setState({availTime: val})}
          />
          <FieldForm
            index="4"
            title="Starting Time"
            type="DATETIMEPICKER"
            placeholder="Starting Time"
            dateValue={startingTime}
            showDateTimePicker={() => {
              this._showDateTimePicker('isStartingTimeVisible');
            }}
            isVisible={this.state.isStartingTimeVisible}
            onConfirm={(time) => this._handleDatePicked(time, 'time')}
            onCancel={() => this._hideDateTimePicker('isStartingTimeVisible')}
            mode="time"
            is24Hour={false}
            labelName="Closing Hours"
          />
          <FieldForm
            index="5"
            type="INDECREASE"
            label="Numbers of Destination"
            numDest={this.state.numDest}
            increaseNumDest={this._increaseNumDest}
            decreaseNumDest={this._decreaseNumDest}
          />
          <FieldForm
            index="6"
            type="DROPDOWN"
            onValueChange={(val) => this._onChangeText(val, 'selectedValue')}
            selectedValue={this.state.selectedValue}
          />
        </View>

        <TouchableOpacity onPress={this._getRoute} style={styles.btnContainer}>
          <View>
            <Text style={styles.txtBtnNext}>Next</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
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
    backgroundColor: 'grey',
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
  btnContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#E0A21F',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    padding: 5,
  },
  txtBtnNext: {
    fontSize: 18,
    color: 'white',
  },
  buttonInDecrease: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
