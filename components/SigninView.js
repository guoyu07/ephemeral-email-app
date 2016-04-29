import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';

import {GoogleSigninButton} from 'react-native-google-signin';
import GoogleSignin from '../sign_in';
import Store from '../lib/Store';
import ROUTES from '../routes';

export default class SigninView extends Component {

  _signIn() {
    GoogleSignin.signIn()
    .then((user) => {
      console.log(user);
      Store.setUser(user);
      return user;
    })
    .then((user)=>{
      var {navigator} = this.props;
      navigator.immediatelyResetRouteStack([]);
      var route = ROUTES.emails;
      route.user = user;
      console.log('route', route);
      navigator.push(route);
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
  }

  render() {

    console.log('routes', this.props.navigator.getCurrentRoutes());

    return (
      <View style={styles.container}>
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
  }
})