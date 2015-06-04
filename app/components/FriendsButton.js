var React           = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

var ContactView       = require('./ContactView');
var MessageComponent  = require('./MessageComponent');



var FriendsButton   = React.createClass({
    
  nextPage() {
    this.props.toRoute({
      name: "Contact",
      component: ContactView
    });
  },
  messagePage() {
    this.props.toRoute({
      name: "Contact",
      component: MessageComponent
    });
  },
  render() {
    return (
      <View>
      <TouchableHighlight onPress={this.nextPage} underlayColor="transparent">
        <Text style={styles.backButton}>+</Text>
      </TouchableHighlight>
            <TouchableHighlight onPress={this.messagePage} underlayColor="transparent">
        <Text style={styles.addButton}>Ecrire</Text>
      </TouchableHighlight>
      </View>
    )
  }
});


var styles = StyleSheet.create({
  backButton: {
    marginRight : 10,
    color: '#ffffff',
    fontSize : 25,
  },
  addButton : {
    position : 'absolute',
    top : -21,
    left : -50,
    color: '#ffffff',

  }

}); 

module.exports = FriendsButton;