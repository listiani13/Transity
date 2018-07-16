// @flow
import React, {Component, Fragment} from 'react';
import {StyleSheet, View, TouchableOpacity, Alert} from 'react-native';
// $FlowFixMe
import {NavigationActions} from 'react-navigation';
import {Text, Loading} from '../../components/CoreComponents';
import FieldForm from '../../components/FieldForm';
import {SERVER_NAME} from '../../data/config';
import sprintf from '../../helpers/sprintf';

type Props = {
  navigation: NavigationObject,
};
type State = {
  placeName: string,
  latitude: string,
  longitude: string,
  openingTime: string,
  closingTime: string,
  open24h: boolean,
  isLoading: boolean,
  placeID: ?string,
  isOpeningTimeVisible: boolean,
  isClosingTimeVisible: boolean,
};
export default class AddNewPlaceScene extends Component<Props, State> {
  static navigationOptions: ({navigation: NavigationObject}) => Object = () => {
    return {
      headerTitle: 'Place Details',
      headerStyle: {
        paddingLeft: 10,
        backgroundColor: '#E0A21F',
        borderBottomColor: 'transparent',
      },
      headerTintColor: 'white',
    };
  };
  state = {
    placeName: '',
    latitude: '',
    longitude: '',
    openingTime: '',
    closingTime: '',
    isLoading: false,
    placeID: null,
    isOpeningTimeVisible: false,
    isClosingTimeVisible: false,
    open24h: false,
  };
  _showDateTimePicker = (inputName) =>
    this.setState({
      [inputName]: true,
    });

  _hideDateTimePicker = (inputName: string) =>
    this.setState({
      [inputName]: false,
    });

  _handleDatePicked = (time, fieldName: 'open' | 'close') => {
    let hour = sprintf(time.getHours());
    let mins = sprintf(time.getMinutes());
    let inputName = fieldName === 'open' ? 'openingTime' : 'closingTime';
    let inputVisibility =
      fieldName === 'open' ? 'isOpeningTimeVisible' : 'isClosingTimeVisible';

    this.setState({[inputName]: hour + ':' + mins});
    this._hideDateTimePicker(inputVisibility);
  };
  componentDidMount = () => {
    let {place} = this.props.navigation.state.params || '';
    if (place != null) {
      let {
        destID,
        destName,
        lat,
        lng,
        openingTime,
        closingTime,
        open24h,
      } = place;
      this.setState({
        placeName: destName,
        latitude: lat,
        longitude: lng,
        placeID: destID,
        openingTime,
        closingTime,
        open24h,
      });
    }
  };
  _onChangeText = (val, inputName) => {
    this.setState({[inputName]: val});
  };
  _resetAction = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'AdminHomeScene'})],
    });
    this.props.navigation.dispatch(resetAction);
  };
  _displayErrorMessage = (title: string, message: string) => {
    Alert.alert(title, message, [{text: 'OK', onPress: () => {}}], {
      cancelable: false,
    });
  };
  _save = async () => {
    this.setState({isLoading: true});
    try {
      let {
        placeName,
        latitude,
        longitude,
        placeID,
        openingTime,
        closingTime,
      } = this.state;
      let url = placeID == null ? 'insert_destinations' : 'update_destinations';
      let body = {
        dest_id: placeID,
        dest_name: placeName,
        lat: latitude,
        lng: longitude,
        opening_time: openingTime,
        closing_time: closingTime,
      };

      let raw = await fetch(`${SERVER_NAME}/admin/${url}.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      let status = await raw.json();

      if (status.status === 'OK') {
        this._resetAction();
      }
    } catch (error) {
      this._displayErrorMessage('Error Occured', error.message);
      this.setState({isLoading: false});
    }
  };
  _onSwitchToggle = () => {
    let {open24h} = this.state;
    let newOpen24h = !open24h;
    let newState;
    if (newOpen24h) {
      newState = {
        openingTime: '00:00',
        closingTime: '00:00',
        open24h: newOpen24h,
      };
    } else {
      newState = {
        open24h: newOpen24h,
      };
    }
    this.setState(newState);
  };
  render() {
    let {
      placeName,
      isLoading,
      longitude,
      latitude,
      openingTime,
      closingTime,
      open24h,
    } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <FieldForm
            index="1"
            title="Place Name"
            type="TEXT_INPUT"
            placeholder="Place Name"
            onChangeText={(text) => {
              this._onChangeText(text, 'placeName');
            }}
            value={placeName}
          />
          <FieldForm
            index="2"
            title="Latitude"
            type="TEXT_INPUT"
            placeholder="Latitude"
            onChangeText={(text) => {
              this._onChangeText(text, 'latitude');
              // we should get this from map later
              // this._onChangeText(text, 'tripName');
            }}
            value={latitude}
          />
          <FieldForm
            index="3"
            title="Longitude"
            type="TEXT_INPUT"
            placeholder="Longitude"
            onChangeText={(text) => {
              this._onChangeText(text, 'longitude');
              // TODO: This should come from google place picker
            }}
            value={longitude}
          />
          <FieldForm
            type="SWITCH"
            onValueChange={this._onSwitchToggle}
            value={open24h}
            placeholder="Open 24 Hours"
          />
          {open24h ? null : (
            <Fragment>
              <FieldForm
                index="4"
                title="Opening Hours"
                type="DATETIMEPICKER"
                placeholder="Opening Hours"
                dateValue={openingTime}
                showDateTimePicker={() =>
                  this._showDateTimePicker('isOpeningTimeVisible')
                }
                isVisible={this.state.isOpeningTimeVisible}
                onConfirm={(time) => this._handleDatePicked(time, 'open')}
                onCancel={() =>
                  this._hideDateTimePicker('isOpeningTimeVisible')
                }
                mode="time"
                is24Hour={false}
                labelName="Opening Hour"
              />
              <FieldForm
                index="5"
                title="Closing Hours"
                type="DATETIMEPICKER"
                placeholder="Closing Hours"
                dateValue={closingTime}
                showDateTimePicker={() => {
                  this._showDateTimePicker('isClosingTimeVisible');
                }}
                isVisible={this.state.isClosingTimeVisible}
                onConfirm={(time) => this._handleDatePicked(time, 'close')}
                onCancel={() =>
                  this._hideDateTimePicker('isClosingTimeVisible')
                }
                mode="time"
                is24Hour={false}
                labelName="Closing Hours"
              />
            </Fragment>
          )}
        </View>

        <TouchableOpacity style={styles.btnContainer} onPress={this._save}>
          <View>
            <Text style={styles.txtBtnNext}>Save</Text>
          </View>
        </TouchableOpacity>
        {isLoading ? <Loading /> : null}
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
  txtBtnNext: {
    fontSize: 18,
    color: 'white',
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
});
