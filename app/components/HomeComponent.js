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
       return {dataSource: ds.cloneWithRows(this.getMessages() )}
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({dataSource: ds.cloneWithRows( this.getMessages() )});
    
  },
  getMessages : function () {
    if (this.props.data) {
      return [this.props.data];
    }
    return message.sort(function(a, b){return a.id-b.id});
  },
  onClick  : function (item) {
    this.props.toRoute({component : HomeComponent , data :item });
  },
  render: function() {
    return (
       <SideMenu menu={<MenuComponent/>}>
          <ScrollView style={styles.wrapper}>
           <RefreshableListView
            dataSource={this.state.dataSource}
            renderRow={this.displayRow}
            minDisplayTime={12}
            refreshDescription="Refreshing"
          />
          </ScrollView>
        </SideMenu>

      );
  },
   displayRow : function (item){
    return(
        <TouchableHighlight onPress={ () => this.onClick(item) } underlayColor="#e5e5e5">
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