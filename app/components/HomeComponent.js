var React               = require('react-native');
var SideMenu            = require('react-native-side-menu');
var RefreshableListView = require('react-native-refreshable-listview');


var {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  ListView,
  TouchableHighlight
} = React;


var MenuComponent       = require('./MenuComponent');

/****************Test datas********************/
var message             = require("../../message");
/**********************************************/


var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});


var HomeComponent = React.createClass({
  getInitialState: function(){
       return {dataSource: ds.cloneWithRows(message)}
  },
  createMessage : function (event) {
      message.push(
          {
              id : 3,
              image : 'https://scontent-fra.xx.fbcdn.net/hphotos-xfp1/v/t1.0-9/1795788_10203253164639359_783890139_n.jpg?oh=2959c90a0fd741df4c2efdd43a0f1061&oe=55CAB79F',
              post :  event.nativeEvent.text
          }
      );
      this.forceUpdate();
      //this.setState({message : messages});
  },
  componentWillMount: function() {
    //this.setState({message : message})
  },
  getMessages : function () {
    console.log("test");
    message.push(
      {
        id : 12,
        user : "Salomé Jochim",
        date : "02/07/15",
        image : 'https://fbcdn-sphotos-g-a.akamaihd.net/hphotos-ak-xfp1/v/t1.0-9/10997376_10205313000736351_6478491909152275954_n.jpg?oh=3d29b74bc31d73060304acbe2f203c2b&oe=55E3FD34&__gda__=1440927057_4fe2144c7fa29a6c6b672e9fb0942f41',
        post : "Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse"
    });
    this.setState({dataSource: ds.cloneWithRows(message)})

    //return message;
  },
  render: function() {
    return (
       <SideMenu menu={<MenuComponent/>}>
          <ScrollView style={styles.wrapper}>
           <RefreshableListView
            dataSource={this.state.dataSource}
            renderRow={this.displayRow}
            loadData={this.getMessages}
            minDisplayTime={12}
            refreshDescription="Refreshing"
          />
          </ScrollView>
        </SideMenu>

      );
  },
   displayRow : function (item){
    return(
        <TouchableHighlight underlayColor="#e5e5e5">
            <View style={styles.item} key={item.id}>
                <Image style={styles.icon} source={{uri: item.image}} />
                <Text style={styles.user}>{item.user}</Text>
                <Text style={styles.date}>{item.date}</Text>

                <Text style={styles.textItem}>{item.post}</Text>
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
  date : {
    position: 'absolute',
    fontSize : 10,
    margin : 10,

    marginTop : 30,

  },
  user : {
    position: 'absolute',
    margin : 10,
    fontWeight : '500',

  },
  text: {
    margin : 10,
    flex: 1
  },
  textItem : {
    margin : 10,
    marginTop : 50,
    flex: 1
  },
  textButton : {
     margin : 10,
     textAlign : 'right',
    flex: 1
  },
  icon: {
    alignItems : 'center',
    width: 40,
    height: 40,
    marginLeft : 10,
    marginTop:20,
    borderRadius: 20
  },
});
module.exports = HomeComponent;