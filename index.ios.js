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
  View,
  Navigator,
} from 'react-native';

import ROUTES from './routes';

class UberForSnapchatters extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderScene(route, navigator) {
    return (
      <route.component
        name={route.name}
        user={route.user}
        navigator={navigator}
        onForward={()=>route.onForward(navigator)}
        onBack={()=> route.onBack(navigator)} />
    );
  }

  _configureScene(route) {
    return Navigator.SceneConfigs.FloatFromRight
  }

  render() {
    return (
      <Navigator
        style={styles.navigationContainer}
        initialRoute={ROUTES.loading}
        renderScene={this.renderScene}
        configureScene={this._configureScene} />
    );
  }
}

const styles = StyleSheet.create({
  navigationContainer: {
    flex: 1
  }
});

AppRegistry.registerComponent('UberForSnapchatters', () => UberForSnapchatters);
