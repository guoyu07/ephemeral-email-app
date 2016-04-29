import React, {
  Component,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';

import Store from '../lib/Store';
import ROUTES from '../routes';
import GmailAPI from '../gmail';

export default class LoadingView extends Component {

  componentDidMount() {

    // AsyncStorage.getAllKeys().then((keys)=>{console.log(keys)});
    AsyncStorage.getItem("live_threads").then((data)=>{
      console.log(data);
    });

    // AsyncStorage.clear();

    Store.getUser().then((user)=>{
      if (user) {

        var gmail = new GmailAPI(user.id, user.accessToken);
        gmail.verifyToken().then(({error})=>{
          var {navigator} = this.props;

          if (error && (error === "invalid_token" || error.message === "Login Required")) {
            ROUTES.slideTo(ROUTES.signin, navigator);
          } else {
            var route = ROUTES.emails;
            route.user = user;
            ROUTES.slideTo(route, navigator);
          }
        });

      } else {

        setTimeout(()=>{
          var {navigator} = this.props;
          ROUTES.slideTo(ROUTES.signin, navigator);
        }, 2500);
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Quill!
        </Text>
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