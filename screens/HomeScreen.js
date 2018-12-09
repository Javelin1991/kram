import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  ActivityIndicator,
  ListView
} from 'react-native';
import { MonoText } from '../components/StyledText';
import CardView from 'react-native-cardview';
import { Ionicons } from '@expo/vector-icons';
import Dialog, { SlideAnimation, DialogContent, DialogTitle, DialogButton } from 'react-native-popup-dialog';
import Card from '../components/Card';
import KramDialog from '../components/KramDialog';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const LEFT_DATA_SOURCE = [
  {
    key: 0,
    title: 'Wallet',
    image: '',
    price: 10,
    description: 'Good bag',
    imageUrl: require("../assets/images/Img_1.png"),
    time: '',
    location: '',
    address: '',
  },
  {
    key: 1,
    title: 'Bag',
    image: '',
    price: 10,
    description: 'Good bag',
    imageUrl: require("../assets/images/Img_2.png"),
    time: '',
    location: '',
    address: '',
  },
  {
    key: 2,
    title: 'Bag',
    image: '',
    price: 10,
    description: 'Good bag',
    imageUrl: require("../assets/images/Img_3.png"),
    time: '',
    location: '',
    address: '',
  },
  {
    key: 3,
    title: 'Wallet',
    image: '',
    price: 10,
    description: 'Good bag',
    imageUrl: require("../assets/images/Img_4.png"),
    time: '',
    location: '',
    address: '',
  },
];
const RIGHT_DATA_SOURCE = [
  {
    key: 0,
    title: 'Wallet',
    image: '',
    price: 10,
    description: 'Good bag',
    imageUrl: require("../assets/images/Img_5.png"),
    time: '',
    location: '',
    address: '',
  },
  {
    key: 1,
    title: 'Wallet',
    image: '',
    price: 10,
    description: 'Good bag',
    imageUrl: require("../assets/images/Img_6.png"),
    time: '',
    location: '',
    address: '',
  },
  {
    key: 2,
    title: 'Wallet',
    image: '',
    price: 10,
    description: 'Good bag',
    imageUrl: require("../assets/images/Img_7.png")
  },
  {
    key: 3,
    title: 'Bag',
    image: '',
    price: 10,
    description: 'Good bag',
    imageUrl: require("../assets/images/Img_8.png"),
    time: '',
    location: '',
    address: '',
  },
];

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    const lds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const rds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      isOpenDialog: false,
      type: '',
      isLoading: false,
      isItemView: true,
      isKramView: false,
      isPaymentSuccessView: false,
      leftDataSource: lds.cloneWithRows(LEFT_DATA_SOURCE),
      rightDataSource: rds.cloneWithRows(RIGHT_DATA_SOURCE),
      dialogData: {}
    }
  }

  toggleDialog = (rowData = {}) => {
    this.setState({
      isOpenDialog: !this.state.isOpenDialog,
      dialogData: rowData,
      type: '',
      isLoading: false,
      isItemView: true,
      isKramView: false,
      isPaymentSuccessView: false
   });
  }

  resetLoaderOnDelay = () => {
    if (this.loaderTimeout != undefined) clearTimeout(this.loaderTimeout);
    this.loaderTimeout = setTimeout(() => { this.setState({ isLoading: !this.state.isLoading }) }, 200);
  }

  goToKramView = () => {
    this.setState({ isLoading: true, type: 'kram', isItemView: false, isKramView: true, isPaymentSuccessView: false });
    this.resetLoaderOnDelay();
  }

  goToPaymentSuccessView = () => {
    this.setState({ isLoading: true, type: 'payment_success', isItemView: false, isKramView: false, isPaymentSuccessView: true });
    this.resetLoaderOnDelay();
  }

  handleAction = () => {
    switch(this.state.type) {
      case 'kram':
        this.goToPaymentSuccessView();
        break;
      case 'payment_success':
        this.toggleDialog();
        break;
      default:
        this.goToKramView();
        break;
    }
  }

  renderRow = (rowData, sectionID, rowID) => (
      <Card
        toggleModal={() => this.toggleDialog(rowData)}
        image={this.state.image}
        title={rowData.title}
        price={rowData.price}
        imageUrl={rowData.imageUrl}
        description={rowData.description}
      />
  )

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.grid}>
          <View style={[styles.list, { marginRight: 8 }]}>
            <ListView
              renderRow={this.renderRow}
              dataSource={this.state.leftDataSource}
            />
          </View>
          <View style={styles.list}>
            <ListView
              renderRow={this.renderRow}
              dataSource={this.state.rightDataSource}
            />
          </View>
        </View>
        <KramDialog
          isOpenDialog={this.state.isOpenDialog}
          isLoading={this.state.isLoading}
          isItemView={this.state.isItemView}
          isKramView={this.state.isKramView}
          isPaymentSuccessView={this.state.isPaymentSuccessView}
          toggleDialog={this.toggleDialog}
          handleAction={this.handleAction}
          title={this.state.dialogData.title}
          price={this.state.dialogData.price}
          image={this.state.dialogData.image}
          time={this.state.dialogData.time}
          location={this.state.dialogData.location}
          address={this.state.dialogData.address}
          description={this.state.dialogData.description}
          imageUrl={this.state.dialogData.imageUrl}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: 'white'
  },
  bigHeader:{
    fontFamily: 'Avenir',
    fontSize: 40,
    lineHeight: 50,
    paddingBottom: 20,
    fontWeight: '700',
    alignSelf: 'center'
  },
  header: {
    fontFamily: 'Avenir',
    fontSize: 20,
    lineHeight: 25,
    paddingBottom: 20,
    paddingTop: 30
  },
  dialogContainer: {
    flex: 1,
    marginBottom: 50
  },
  dialogContentContainer: {
    flex: 1,
  },
  leftImageContainer: {
    position: 'absolute',
    left: WINDOW_WIDTH/10,
    top: WINDOW_WIDTH/10,
    height: 140,
    width: 140,
    borderRadius: 100,
  },
  middleImageContainer: {
    position: 'absolute',
    left: WINDOW_WIDTH/3.8,
    top: WINDOW_WIDTH/5,
    height: 140,
    width: 140,
    borderRadius: 100,
  },
  rightImageContainer: {
    position: 'absolute',
    right: WINDOW_WIDTH/12,
    top: WINDOW_WIDTH/10,
    height: 140,
    width: 140,
    borderRadius: 100,
  },
  image: {
    height: WINDOW_WIDTH/2,
    width: WINDOW_WIDTH/2,
    overflow: 'hidden'
  },
  matchTitleContainer: {
    position: 'absolute',
    padding: 30,
    alignSelf: 'center',
    top: WINDOW_WIDTH/1.5
  },
  matchTitle: {
    fontFamily: 'Avenir',
    fontSize: 18,
    lineHeight: 25,
  },
  loaderContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 16
  },
  list: {
    flex: 1,
    width: WINDOW_WIDTH/2
  }
});
