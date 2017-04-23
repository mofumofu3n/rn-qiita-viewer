import React, {Component} from 'react';
import { WebView } from 'react-native';

export default class QiitaItemScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.title}`,
  });

  render() {
    return(
      <WebView
        source={{uri: this.props.navigation.state.params.url}}
      />
    );
  }
}

