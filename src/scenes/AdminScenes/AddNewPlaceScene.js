// @flow
import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
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
  openingHours: string,
  isLoading: boolean,
  placeID: ?string,
  isOpeningTimeVisible: boolean,
  isClosingTimeVisible: boolean,
  closingHours: string,
};
export default class AddNewPlaceScene extends Component<Props, State> {
  state = {
    placeName: '',
    latitude: '',
    longitude: '',
    openingHours: '',
    closingHours: '',
    isLoading: false,
    placeID: null,
    isOpeningTimeVisible: false,
    isClosingTimeVisible: false,
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
    let inputName = fieldName === 'open' ? 'openingHours' : 'closingHours';
    let inputVisibility =
      fieldName === 'open' ? 'isOpeningTimeVisible' : 'isClosingTimeVisible';

    this.setState({[inputName]: hour + ':' + mins});
    this._hideDateTimePicker(inputVisibility);
  };
  componentDidMount = () => {
    let {place} = this.props.navigation.state.params || '';
    if (place != null) {
      let {destID, destName, lat, lng} = place;
      this.setState({
        placeName: destName,
        latitude: lat,
        longitude: lng,
        placeID: destID,
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
  _save = async () => {
    this.setState({isLoading: true});
    try {
      let {
        placeName,
        latitude,
        longitude,
        placeID,
        openingHours,
        closingHours,
      } = this.state;
      let url = placeID == null ? 'insert_destinations' : 'update_destinations';
      let body = {
        dest_id: placeID,
        dest_name: placeName,
        lat: latitude,
        lng: longitude,
        opening_time: openingHours,
        closing_time: closingHours,
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
      this.setState({isLoading: false});
    }
  };
  render() {
    let {
      placeName,
      isLoading,
      longitude,
      latitude,
      openingHours,
      closingHours,
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
              // TODO: This should come from date time picker
              // this._onChangeText(text, 'tripName');
            }}
            value={longitude}
          />
          <FieldForm
            index="4"
            title="Opening Hours"
            type="DATETIMEPICKER"
            placeholder="Opening Hours"
            dateValue={openingHours}
            showDateTimePicker={() =>
              this._showDateTimePicker('isOpeningTimeVisible')
            }
            isVisible={this.state.isOpeningTimeVisible}
            onConfirm={(time) => this._handleDatePicked(time, 'open')}
            onCancel={() => this._hideDateTimePicker('isOpeningTimeVisible')}
            mode="time"
            is24Hour={false}
            labelName="Opening Hour"
          />
          <FieldForm
            index="5"
            title="Closing Hours"
            type="DATETIMEPICKER"
            placeholder="Closing Hours"
            dateValue={closingHours}
            showDateTimePicker={() => {
              this._showDateTimePicker('isClosingTimeVisible');
            }}
            isVisible={this.state.isClosingTimeVisible}
            onConfirm={(time) => this._handleDatePicked(time, 'close')}
            onCancel={() => this._hideDateTimePicker('isClosingTimeVisible')}
            mode="time"
            is24Hour={false}
            labelName="Closing Hours"
          />
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
