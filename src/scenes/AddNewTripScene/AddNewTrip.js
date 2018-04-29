// @flow
import React, {Component} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Ionicons} from '@expo/vector-icons';

import FieldForm from './components/FieldForm';
import sprintf from '../../helpers/sprintf';
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
};
export default class AddNewTrip extends Component<Props, State> {
  state: State = {
    tripName: '',
    tripDate: '',
    availTime: 4,
    numDest: 1,
    tripDescription: '',
    isDatePickerVisible: false,
  };
  static navigationOptions = ({navigation}) => {
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
    let {availTime, numDest, tripName, tripDate, tripDescription} = this.state;
    if (tripName !== '' && tripDate !== '' && tripDescription !== '') {
      try {
        let data = await fetch(
          `http://localhost/ga_test/Generasi.php?availTime=${availTime}&numDest=${numDest}`,
        );
        let jsonData = await data.json();
        let destination = jsonData[1].destinasi;
        this.props.navigation.navigate('RouteScene', {
          destination,
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
  _onEndEditing = (event, inputName) => {
    let text = event.nativeEvent.text;
    this.setState({[inputName]: text});
  };
  _showDateTimePicker = () =>
    this.setState({
      isDatePickerVisible: true,
    });

  _hideDateTimePicker = () =>
    this.setState({
      isDatePickerVisible: false,
    });

  _handleDatePicked = (date) => {
    let month = sprintf(date.getMonth().toString());
    let day = sprintf(date.getDay().toString());
    let year = date.getFullYear();
    let newDateString = day + '/' + month + '/' + year;

    this.setState({tripDate: newDateString});
    this._hideDateTimePicker();
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
    let {tripDate} = this.state;
    return (
      <View style={styles.container}>
        <View>
          <FieldForm
            index="1"
            type="TEXT_INPUT"
            placeholder="Trip Name"
            onEndEditing={(event) => {
              this._onEndEditing(event, 'tripName');
            }}
          />
          <FieldForm
            index="2"
            type="DATEPICKER"
            placeholder="Date"
            dateValue={tripDate}
            showDateTimePicker={this._showDateTimePicker}
            isVisible={this.state.isDatePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
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
            type="INDECREASE"
            label="Numbers of Destination"
            numDest={this.state.numDest}
            increaseNumDest={this._increaseNumDest}
            decreaseNumDest={this._decreaseNumDest}
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
