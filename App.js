/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import AuthLoadingScreen from './AuthLoadingScreen';
import HomeScreen from './HomeScreen';
import SignInScreen from './SignInScreen';

const RootStack = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  App: createStackNavigator({
    Home: HomeScreen
  }),
  Auth: createStackNavigator({
    SignIn: SignInScreen
  })
}, {
    initialRouteName: 'AuthLoading'
  })

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

// import { Platform, StyleSheet, Text, View } from 'react-native';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome to React Native!</Text>
//         <Text style={styles.instructions}>To get started, edit App.js</Text>
//         <Text style={styles.instructions}>{instructions}</Text>
//         <Text>despacito epic</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
