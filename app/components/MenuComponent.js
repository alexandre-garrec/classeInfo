var React = require('react-native');

var {
  StyleSheet,
  Text,
  Image,
  View,
  NavigatorIOS,
  ScrollView,
  ListView,
  TextInput,
  TouchableHighlight
} = React;


var MenuComponent = React.createClass({
  about: function() {
    //this.props.menuActions.close();
    //this.props.navigator.push({...});
  },

  render: function() {
    return (
      <ScrollView style={styles.menu}>
        <Text style={styles.menuTitle}>Vos classes</Text>
        <View style={styles.itemSelect}>
          <Text style={styles.text}>6 ieme</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>3 ieme</Text>
        </View>
        <Text style={styles.menuTitle}>Eleves</Text>
        <View style={styles.item}>
          <Text style={styles.text}>Alexandre Garrec</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>Salomé Jochim</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.text}>Julien Peltier</Text>
        </View>
      </ScrollView>
    );
  }
});



var styles = StyleSheet.create({

  menu: {
    flex: 1,
    width: 300,
    height:999,
    backgroundColor: '#ECEFF1',
  },
  menuTitle : {
    fontSize : 20,
    marginTop : 20,
    marginBottom : 20,
    marginLeft : 10,
    marginRight : 10,

  },
  item : {
    borderBottomColor : "#e5e5e5",
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  itemSelect : {
    borderBottomColor : "#e5e5e5",
    borderBottomWidth: 1,
    flexDirection: 'row',
    backgroundColor: '#e5e5e5',

  },
  text: {
    margin : 10,
    flex: 1
  }

});

module.exports = MenuComponent;