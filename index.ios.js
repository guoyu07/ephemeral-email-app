/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import GoogleSignin from './sign_in';
import {GoogleSigninButton} from 'react-native-google-signin';

class UberForSnapchatters extends Component {

  _signIn() {
    GoogleSignin.signIn()
    .then((user) => {
      console.log(user);
      this.setState({user: user});

      this._getEmails();
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
  }

  _getEmails() {
    var {user} = this.state;

    var userId = user.id;
    var {accessToken} = user;

    var queryString;


    fetch(`/users/${userId}/threads?access_token=${accessToken}`).
      then( (response) => {
        return response.json();
      }).then( (body) => {
        console.log(body);
      }).catch((err) =>{
        throw(err);
      });
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <GoogleSigninButton
          style={{width: 250, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this._signIn.bind(this)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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

AppRegistry.registerComponent('UberForSnapchatters', () => UberForSnapchatters);
