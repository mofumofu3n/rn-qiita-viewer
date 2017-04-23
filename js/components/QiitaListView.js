import React, {Component} from 'react';
import {
  TouchableHighlight, 
  ListView, 
  StyleSheet, 
  Text, 
  Image, 
  View, 
} from 'react-native';
import { StackNavigator } from 'react-navigation';

const QIITA_URL = "https://qiita.com/api/v2/tags/reactjs/items"

export default class QiitaListView extends Component {
  static navigationOptions = {
    title: 'Qiita'
  }

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.state = {
      items: ds,
      loaded: false
    }
  }

  componentWillMount() {
    this._fetchItems();
  }

  render() {
    if (!this.state.loaded) {
      return this._renderLoadingView();
    }

    return(<ListView
      dataSource={this.state.items}
      renderRow={this._renderRow}
      style={styles.listView}
      />
    );
  }

  _renderLoadingView() {
    return(
      <View style={styles.container}>
        <Text>
          Loading items....
        </Text>
      </View>
    );
  }

  _onPressed(rowData) {
    this.props.navigation.navigate('Item', {
      url: rowData.url,
      title: rowData.title,
    });
  }

  _renderRow = (rowData, sectionID, rowID) => {
    return(
      <TouchableHighlight onPress={() => this._onPressed(rowData)} >
        <View style={styles.container}>
          <Image 
            source={{uri: rowData.user.profile_image_url}}
            style= {styles.thumbnail}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{rowData.title}</Text>
            <Text style={styles.name}>{rowData.user.id}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  _fetchItems() {
    fetch(QIITA_URL)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          items: this.state.items.cloneWithRows(json),
          loaded: true
        })
      })
      .done();
  }

}

const styles = StyleSheet.create({
  listView: {
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    margin: 8,
    textAlign: 'left',
  },
  name: {
    fontSize: 12,
    margin: 8,
    textAlign: 'left',
  },
  thumbnail: {
    width: 80,
    height: 80,
    margin: 2,
  },
});
