import React, {
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import GmailAPI from '../gmail';
import EmailList from './EmailList';
import async from 'async';
import _ from 'underscore';
import dummy from './dummy';
import NavigationBar from 'react-native-navbar';
import Store from '../lib/Store';

console.log('async', async);

export default class EmailsView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      emails: []
    };
  }

  componentDidMount() {

    var {user} = this.props;
    this.gmail = new GmailAPI(user.id, user.accessToken);

    this.gmail.getThreads({labelIds: "INBOX", maxResults: 7}).then((body)=>{
      console.log(body);
      return body.threads;
    })
    .then((threads) => {
      async.map(threads, (thread, callback) =>{
        this.gmail.getThread(thread.id)
          .then((thread)=>{
            if (thread.error) {
              callback(null, null);
            } else {
              thread = {
                id: thread.id,
                historyId: thread.historyId,
                messages: thread.messages.map(({id, payload, internalDate})=>{
                  return {id, payload, internalDate}
                })
              }
              callback(null, thread);
            }
          });
      }, (err, threads) => {
        Store.setThreads(threads).
          then(Store.getLiveThreads).
          then((threads)=>{
            this.setState({emails: threads});
          });
      })
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={{title: 'Hello'}} />
        <EmailList emails={this.state.emails} navigator={this.props.navigator} />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  }
});