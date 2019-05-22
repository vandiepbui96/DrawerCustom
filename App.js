/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions, PanResponder } from 'react-native';



export default class App extends Component {
  scroll = new Animated.Value(0)

  opentDrawer = () => {

    Animated.timing(this.scroll, {
      toValue: 200,
    }).start()

  }
  closeDrawer = () => {
    Animated.timing(this.scroll, {
      toValue: 0,
    }).start()

  }


  pan = PanResponder.create({
    // Ask to be the responder:
    onStartShouldSetPanResponder: (evt, gestureState) => false,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,

    onPanResponderGrant: (evt, gestureState) => {

    },
    onPanResponderMove: Animated.event(
      [null,
        { dx: this.scroll, }
      ]),
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (evt, gestureState) => {

    },
    onPanResponderTerminate: (evt, gestureState) => {

    },
    onShouldBlockNativeResponder: (evt, gestureState) => {
      return false;
    }
  });




  render() {
    let rotateLeft = this.scroll.interpolate({
      inputRange: [0, 200],
      outputRange: ['-40deg', '0deg'],
      extrapolate: 'clamp'
    })

    let rotateRight = this.scroll.interpolate({
      inputRange: [0, 200],
      outputRange: ['0deg', '-60deg'],
      extrapolate: 'clamp'
    })

    let translateRight = this.scroll.interpolate({
      inputRange: [0, 200],
      outputRange: [0, Dimensions.get('window').width / 2.4],
      extrapolate: 'clamp'
    })

    let scaleRight = this.scroll.interpolate({
      inputRange: [0, 200],
      outputRange: [1, 0.7],
      extrapolate: 'clamp'
    })

    let translateLeft = this.scroll.interpolate({
      inputRange: [0, 200],
      outputRange: [-Dimensions.get('window').width / 2.4, 0],
      extrapolate: 'clamp'
    })
    let opacityLeft = this.scroll.interpolate({
      inputRange: [0, 200],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })



    return (
      <View {...this.pan.panHandlers} style={{ flex: 1, backgroundColor: 'pink' }}
      >
        <Animated.View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',
          transform: [{ rotateY: rotateRight }, { translateX: translateRight }, { scaleY: scaleRight }]
        }}>
          <TouchableOpacity onPress={this.opentDrawer}>
            <Text>MainScreen</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: Dimensions.get('window').height,
          position: 'absolute',
          backgroundColor: 'green',
          zIndex: -1,
          opacity: opacityLeft,
          width: Dimensions.get('window').width / 2,
          transform: [{ rotateY: rotateLeft }, { translateX: translateLeft }]
        }}>
          <TouchableOpacity
            onPress={this.closeDrawer}
          >
            <Text>Drawer</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
