import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ListView,
  TouchableHighlight
} from 'react-native';

import _ from 'underscore';
import ROUTES from '../routes';
import strftime from 'strftime';

String.prototype.trunc =
 function( n, useWordBoundary ){
     var isTooLong = this.length > n,
         s_ = isTooLong ? this.substr(0,n-1) : this;
     s_ = (useWordBoundary && isTooLong) ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
     return  isTooLong ? s_ + '...' : s_;
  };

const EXPIRY = 24 * 60 * 60 * 1000;

export default class EmailListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ttl: this.calculateTTL()
    };
    this.startExpiryWorker();
  }

  lastEmail() {
    return this.props.email.messages[0];
  }

  calculateTTL() {
    var lastDate = parseInt(this.lastEmail().internalDate);
    var death = lastDate + EXPIRY;
    var now = new Date().getTime();
    return death - now;
  }

  setTTL() {
    var ttl = this.calculateTTL();
    if (ttl > 0) {
      this.setState({ttl});
    } else {

    }
  }

  startExpiryWorker() {
    setInterval(this.setTTL.bind(this), 1000);
  }

  _getOpacity() {
    var {ttl} = this.state;
    var opacity = ttl ? ttl / EXPIRY : 1;
    return {opacity};
  }

  _getFrom(email) {
    var senders = [];
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

  _onPressButton() {
    var route = ROUTES.email;
    var {navigator, email} = this.props;
    route.email = email;
    navigator.push(route);
  }

  _getDate() {
    var datetime = new Date(parseInt(this.lastEmail().internalDate));
    var time = strftime('%H:%M', datetime);
    var date = strftime('%dth %B', datetime);
    return [time, date];
  }

  render() {
    var {email} = this.props;
    console.log(email);
    return (
      <TouchableHighlight style={[styles.wrappable, this._getOpacity()]} onPress={this._onPressButton.bind(this)}>
        <View style={styles.row}>
          <View style={styles.dateBlock}>
            <Text style={styles.dateText}>
              {this._getDate()[0]}
            </Text>
            <Text style={styles.dateText}>
              {this._getDate()[1]}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.text, styles.subject]}>
              {this._getSubject(email).trunc(50, true)}
            </Text>
            <Text style={[styles.text, styles.author]}>
              {this._getFrom(email).trunc(40, true)}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

}

var styles = StyleSheet.create({
  wrappable: {
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    width: Dimensions.get('window').width,
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: '#e4e7e8',
    borderStyle: 'solid'
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
    borderRightWidth: 1,
    borderRightColor: '#e4e7e8',
    borderStyle: 'solid',
    justifyContent: 'center'
  },
  dateText: {
    alignSelf: 'center',
    fontSize: 12
  },
  textContainer: {
    padding: 15,
    // flexWrap: 'wrap',
    flex: 1,
    // height: 80,
    flexDirection: 'column'
  },
  subject: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#40434b'
  },
  author: {
    marginTop: 10,
    fontSize: 11,
    color: '#9fa1a5'
  }
});

function ordinal(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}