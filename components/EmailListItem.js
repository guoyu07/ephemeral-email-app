import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ListView,
} from 'react-native';

import _ from 'underscore';

export default class EmailListItem extends Component {

  _getFrom(email) {
    var senders = [];
    console.log(email);
    email.messages.forEach((message)=>{
      let headers = message.payload.headers;
      for (let header of headers) {
        if (header.name === "From") {
          senders.push(header.value);
        }
      }
    });
    return _.uniq(senders).join(", ");
  }

  _getSubject(thread) {
    var first = thread.messages[0];
    var headers = first.payload.headers;

    for (let header of headers) {
      if (header.name === "Subject") {
        return header.value;
      }
    }
  }

  render() {
    var {email} = this.props;

    return (
      <View>
        <View style={styles.row}>
          <View style={styles.dateBlock}>
            <Text style={styles.dateText}>
              12th
            </Text>
            <Text style={styles.dateText}>
              APRIL
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.text, styles.subject]}>
              {this._getSubject(email)}
            </Text>
            <Text style={[styles.text, styles.author]}>
              {this._getFrom(email)}
            </Text>
          </View>
        </View>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    width: Dimensions.get('window').width,
    height: 80,
    // flexWrap: 'wrap'
  },
  text: {
    fontFamily: 'Helvetica Neue'
  },
  dateBlock: {
    width: 80,
    height: 80,
    backgroundColor: '#f5f8fa',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e4e7e8',
    borderStyle: 'solid',
    justifyContent: 'center'
  },
  dateText: {
    alignSelf: 'center',
  },
  textContainer: {
    padding: 15
  },
  subject: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#40434b'
  },
  author: {
    fontSize: 11,
    color: '#9fa1a5'
  }
});