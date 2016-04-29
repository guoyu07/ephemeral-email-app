import React, {
  Component,
  StyleSheet,
  Text,
  WebView,
  Dimensions,
  View,
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import _ from 'underscore';

function Base64DecodeUrl(str){
    str = (str + '===').slice(0, str.length + (str.length % 4));
    return str.replace(/-/g, '+').replace(/_/g, '/');
}

export default class EmailView extends Component {

  render() {
    var {payload} = this.props.email.messages[0];
    var {parts} = payload;

    if (parts) {
      var htmlPart = parts.find((part)=>{
        return part.mimeType === "text/html";
      });

      var html = atob(Base64DecodeUrl(htmlPart.body.data))
    } else {
      var html = atob(Base64DecodeUrl(payload.body.data));
    }

    return (
      <View style={styles.container}>
        <NavigationBar
          title={{title: 'Hello'}}
          leftButton={{
            title: "Inbox",
            handler: ()=>{this.props.navigator.pop()}
          }} />
        <WebView scalesPageToFit={true} source={{html}} style={styles.webview}>
        </WebView>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  webview: {
    width: Dimensions.get('window').width,
    padding: 10
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  }
});