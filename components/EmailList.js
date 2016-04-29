import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ListView,
} from 'react-native';
import EmailListItem from './EmailListItem';

export default class EmailList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
  }

  componentWillReceiveProps(props) {
    this._emails = props.emails || [];
    var rows = this._emails;
    var rowIds = rows.map((row, index)=> index);

    var ds = this.state.dataSource.cloneWithRows(rows, rowIds);
    this.setState({dataSource: ds});
  }

  renderEmail(email) {
    return (
      <EmailListItem navigator={this.props.navigator} email={email} />
    )
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderEmail.bind(this)}/>
    );
  }

}