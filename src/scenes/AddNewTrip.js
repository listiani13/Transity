// @flow
import React, {Component} from 'react';
import {
  Alert,
  Slider,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Ionicons} from '@expo/vector-icons';
import sprintf from '../helpers/sprintf';
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
  render() {
    let {tripDate} = this.state;
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.fieldContainer}>
            <View style={styles.fieldInnerContainer}>
              <View style={styles.circleNumbering}>
                <Text>1</Text>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.lblTripNameContainer}>
                  <Text style={styles.lblTripName}>Trip Name:</Text>
                </View>
                <View style={styles.txtInputTripNameContainer}>
                  <TextInput
                    placeholder={`Trip Name`}
                    style={styles.txtInputTripName}
                    onEndEditing={(event) => {
                      this._onEndEditing(event, 'tripName');
                    }}
                    autoCorrect={false}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <View style={styles.fieldInnerContainer}>
              <View style={styles.circleNumbering}>
                <Text>2</Text>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.lblTripNameContainer}>
                  <Text style={styles.lblTripName}>Date:</Text>
                </View>
                <View style={styles.txtInputTripNameContainer}>
                  {/* TODO: Change into modal date picker */}
                  <TouchableOpacity onPress={this._showDateTimePicker}>
                    <TextInput
                      placeholder={`Date`}
                      style={styles.txtInputTripName}
                      onFocus={this._showDateTimePicker}
                      value={tripDate}
                      editable={false}
                      pointerEvents="none"
                    />
                  </TouchableOpacity>
                  <DateTimePicker
                    isVisible={this.state.isDatePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <View style={styles.fieldInnerContainer}>
              <View style={styles.circleNumbering}>
                <Text>3</Text>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.lblTripNameContainer}>
                  <Text style={styles.lblTripName}>Description:</Text>
                </View>
                <View style={styles.txtInputTripNameContainer}>
                  {/* TODO: Change into modal date picker */}
                  <TextInput
                    placeholder={`Description`}
                    style={styles.txtInputTripName}
                    onEndEditing={(event) => {
                      this._onEndEditing(event, 'tripDescription');
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <View style={styles.fieldInnerContainer}>
              <View style={styles.circleNumbering}>
                <Text>4</Text>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.lblTripNameContainer}>
                  <Text style={styles.lblTripName}>
                    Availability Time:{this.state.availTime}
                  </Text>
                </View>
                <View style={styles.txtInputTripNameContainer}>
                  <Slider
                    minimumValue={4}
                    maximumValue={12}
                    step={1}
                    onValueChange={(val: number) =>
                      this.setState({availTime: val})
                    }
                  />
                </View>
              </View>
            </View>
          </View>
          {/* TODO: Fix slider! */}
          <View style={styles.fieldContainer}>
            <View style={styles.fieldInnerContainer}>
              <View style={styles.circleNumbering}>
                <Text>4</Text>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.lblTripNameContainer}>
                  <Text style={styles.lblTripName}>
                    Numbers of Destination:{this.state.numDest}
                  </Text>
                </View>
                <View style={styles.txtInputTripNameContainer}>
                  <Slider
                    minimumValue={1}
                    maximumValue={Math.floor(this.state.availTime / 2)}
                    step={1}
                    onValueChange={(val: number) =>
                      this.setState({numDest: val})
                    }
                  />
                </View>
              </View>
            </View>
          </View>
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
});
