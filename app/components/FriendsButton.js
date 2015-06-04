var React           = require('react-native');

var {
  StyleSheet,
  Text,
  TouchableHighlight
} = React;

var ContactView     = require('./ContactView');


var FriendsButton   = React.createClass({
    
  nextPage() {
    this.props.toRoute({
      name: "Contact",
      component: ContactView
    });
  },

  render() {
    return (
      <TouchableHighlight onPress={this.nextPage} underlayColor="transparent">
        <Text style={styles.backButton}>+</Text>
      </TouchableHighlight>
    )
  }
});


var styles = StyleSheet.create({
  backButton: {
    marginRight : 10,
    color: '#ffffff',
    fontSize : 25,
  }

}); 

module.exports = FriendsButton;