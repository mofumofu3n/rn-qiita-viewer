'use strict';

import React, {Component} from 'react';
import { StackNavigator } from 'react-navigation';

import QiitaListView from './js/components/QiitaListView';
import QiitaItemScreen from './js/components/QiitaItemScreen';

const QiitaStackNavigation = StackNavigator({
  Home: {
    screen: QiitaListView,
  },
  Item: {
    screen: QiitaItemScreen,
  }
});

export default () => <QiitaStackNavigation />
