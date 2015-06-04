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

var message          = require("../../message");

var HomeComponent       = require('./HomeComponent');


var MessageComponent = React.createClass({
    getInitialState: function(){
       return {input: ""}
    },
    sendMessage : function () {
        message.push(
          {
            id : 0,
            user : "Alexandre Garrec",
            date : "09/07/15",
            image : 'https://scontent-fra.xx.fbcdn.net/hphotos-xfp1/v/t1.0-9/1795788_10203253164639359_783890139_n.jpg?oh=2959c90a0fd741df4c2efdd43a0f1061&oe=55CAB79F',
            post :  this.state.input
          }
        );
        this.props.toRoute({component : HomeComponent});
    },
    render: function() {
    return (
         <View>
          <TextInput
            style={{height: 200, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({input: text})}
          />
          <Text>{'Preview : ' + this.state.input}</Text>
        <TouchableHighlight style={styles.button} onPress={this.sendMessage} underlayColor="transparent">
            <Text style={styles.val}>Send</Text>
        </TouchableHighlight>
        </View>
    );
  }
});



var styles = StyleSheet.create({
    button : {
        width : 100,
        padding : 20,
        backgroundColor : '#e5e5e5',
    },
    val : {
        textAlign : 'center'
    }

});

module.exports = MessageComponent;