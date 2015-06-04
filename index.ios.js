/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React               = require('react-native');
var Router              = require('react-native-router');
var _                   = require('lodash');


var {
  AppRegistry,
  StyleSheet,
} = React;


var FriendsButton       = require('./app/components/FriendsButton');
var HomeComponent       = require('./app/components/HomeComponent');



var firstRoute = {
  name: 'Accueil',
  component: HomeComponent,
  //leftCorner: FriendsButton
};


var ClasseInfo = React.createClass({
  render: function() {
    return (
      <Router rightCorner={FriendsButton} headerStyle={styles.header} firstRoute={firstRoute} />
    );
  }

});


var styles = StyleSheet.create({
  header: {
    backgroundColor: '#2d9bf0'
  }
});

AppRegistry.registerComponent('classeInfo', () => ClasseInfo);
