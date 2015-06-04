var React               = require('react-native');
var ContactsManager     = require("NativeModules").ContactsManager;
var Composer            = require('NativeModules').RNMessageComposer;

var {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  ListView,
  TextInput,
  TouchableHighlight
} = React;


var ContactView = React.createClass({

  getInitialState: function(){
      return {
        contacts: []
      }
  },
  componentWillMount: function() {
    var self = this;
    this.getAllContacts(function(err, contacts){
      if (err) return;
      self.setState({contacts : contacts})
    });
  },
  getAllContacts: function(callback) {
   ContactsManager.requestAccessToContacts(function(err, result) {
      if (err) {
        // Access not granted
          return callback(err);
      } else {
          ContactsManager.listAllContacts(function(err, contacts) {
              callback(err, contacts);
          });
      }
    });
  },
  sendMessage : function (numbers) {
    Composer.composeMessageWithArgs(
        {
            'messageText':'My sample message body text',
            'subject':'My Sample Subject',
            'recipients': numbers
        },
        (result) => {
            switch(result) {
                case Composer.Sent:
                    console.log('the message has been sent');
                    break;
                case Composer.Cancelled:
                    console.log('user cancelled sending the message');
                    break;
                case Composer.Failed:
                    console.log('failed to send the message');
                    break;
                case Composer.NotSupported:
                    console.log('this device does not support sending texts');
                    break;
                default:
                    console.log('something unexpected happened');
                    break;
            }
        }
    );
  },
  render: function() {
    return (
      <ScrollView style={styles.wrapper}>
        {this.state.contacts.map(this.displayRow)}
      </ScrollView>
    );
  },

  displayRow : function (item){
    return(
       <TouchableHighlight underlayColor="#e5e5e5" onPress={()=> this.sendMessage(item.phoneNumbers)} >
         <View style={styles.item}  key={item.firstName}>
            <Text style={styles.text}>
            {item.firstName} {item.lastName}
            </Text>
            <Text style={styles.textButton}>+</Text>
         </View>
       </TouchableHighlight>
    );
  }
});


var styles = StyleSheet.create({

  wrapper: {
    backgroundColor: '#ffffff',
  },
  item : {
    borderBottomColor : "#e5e5e5",
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  text: {
    margin : 10,
    flex: 1
  },
  textButton : {
     margin : 10,
     textAlign : 'right',
    flex: 1
  }

});

module.exports = ContactView;
