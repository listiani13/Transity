// @flow
import React, {Component} from 'react';
import {
  Slider,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
type State = {
  availTime: number,
  numDest: number,
};
type Props = {};
export default class AddNewTrip extends Component<Props, State> {
  state: State = {
    availTime: 4,
    numDest: 1,
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
      headerStyle: {paddingLeft: 10, backgroundColor: '#E0A21F'},
      headerTintColor: 'white',
    };
  };
  render() {
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
                  <TextInput
                    placeholder={`Date`}
                    style={styles.txtInputTripName}
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
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Text style={styles.txtBtnNext}>Next</Text>
          </TouchableOpacity>
        </View>
        {/* <Text>Detail 1</Text>
        <Button
          onPress={() => {
            this.props.navigation.goBack();
          }}
          title="Go Back"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        /> */}
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
