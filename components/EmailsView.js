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

console.log('async', async);

export default class EmailsView extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

    // THE CODE FOR ACTUAL REQUESTS

    // var {user} = this.props;
    // this.gmail = new GmailAPI(user.id, user.accessToken);

    // this.gmail.getThreads().then((body)=>{
    //   var threads = body.threads;
    //   return threads.slice(0, 3);
    // })
    // .then((threads) => {
    //   async.map(threads, (thread, callback) =>{
    //     this.gmail.getThread(thread.id)
    //       .then((thread)=>{
    //         if (thread.error) {
    //           callback(null, null);
    //         } else {
    //           callback(null, thread);
    //         }
    //       });
    //   }, (err, threads) => {
    //     this.setState({emails: _.compact(threads)});
    //   })
    // });
    this.setState({emails: dummy});
  }

  render() {
    return (
      <View style={styles.container}>
        <EmailList emails={this.state.emails} />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});