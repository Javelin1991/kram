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
import { WebBrowser, Constants } from 'expo';
import { MonoText } from '../components/StyledText';
import CardView from 'react-native-cardview';
import { Ionicons } from '@expo/vector-icons';
import Dialog, { SlideAnimation, DialogContent, DialogTitle, DialogButton } from 'react-native-popup-dialog';
import Card from '../components/Card';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const LEFT_DATA_SOURCE = [
  {
    key: 0,
    title: 'Bag',
    image: '',
    price: 10,
    description: 'Good bag',
    imageUrl: require("../assets/images/Img_1.png")
  },
  {
    key: 1,
    title: 'Wallet',
    image: '',
    price: 10,
    description: 'Good bag',
    imageUrl: require("../assets/images/Img_2.png")
  },
  {
    key: 2,
    title: 'Bag',
    image: '',
    price: 10,
    description: 'Good bag',
    imageUrl: require("../assets/images/Img_3.png")
  },
  {
    key: 3,
    title: 'Bag',
    image: '',
    price: 10,
    description: 'Good bag',
    imageUrl: require("../assets/images/Img_4.png")
  },
];
const RIGHT_DATA_SOURCE = [
  {
    key: 0,
    title: 'Handphone',
    image: '',
    price: 10,
    description: 'Good bag',
    imageUrl: require("../assets/images/Img_5.png")
  },
  {
    key: 1,
    title: 'Pouch',
    image: '',
    price: 10,
    description: 'Good bag',
    imageUrl: require("../assets/images/Img_6.png")
  },
  {
    key: 2,
    title: 'Pouch',
    image: '',
    price: 10,
    description: 'Good bag',
    imageUrl: require("../assets/images/Img_7.png")
  },
  {
    key: 3,
    title: 'Pouch',
    image: '',
    price: 10,
    description: 'Good bag',
    imageUrl: require("../assets/images/Img_8.png")
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
      openModal: false,
      isRematch: false,
      leftDataSource: lds.cloneWithRows(LEFT_DATA_SOURCE),
      rightDataSource: rds.cloneWithRows(RIGHT_DATA_SOURCE)
    }
  }

  toggleModal = () => {
    this.setState({ openModal: !this.state.openModal });
  }

  onRematch = () => {
    this.setState({ isRematch: !this.state.isRematch, isLoading: !this.state.isLoading });
    if (this.loaderTimeout != undefined) clearTimeout(this.loaderTimeout);
    this.loaderTimeout = setTimeout(() => { this.setState({ isLoading: !this.state.isLoading }) }, 2000);
  }

  renderRow = (rowData, sectionID, rowID) => (
      <Card
        toggleModal={this.toggleModal}
        image={this.state.image}
        title={rowData.title}
        price={rowData.price}
        imageUrl={rowData.imageUrl}
        description={rowData.description}
      />
  )

  render() {
    console.log("HN DEBUG hello world");
    const imageUrl = require("../assets/images/Img_6.png");
    return (
      <ScrollView style={styles.container}>
        <View>
         <Text style={styles.bigHeader}>TFIG</Text>
        </View>
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
        <View style={styles.dialogContainer}>
          <Dialog
            key={Object.keys(this.props)}
            visible={this.state.openModal}
            dialogAnimation={new SlideAnimation({
              slideFrom: 'bottom',
            })}
            actions={[
              <DialogButton
                key={0}
                text="Checkout"
                onPress={this.onRematch}
              />,
              <DialogButton
                key={1}
                text="KRAM"
                onPress={this.toggleModal}
              />
            ]}
            width={WINDOW_WIDTH}
            height={WINDOW_HEIGHT}
            onTouchOutside={this.toggleModal}
            containerStyle={[{ flex: 1 }, Platform.OS === 'android' && { marginTop: Constants.statusBarHeight }]}
          >
          <DialogTitle textStyle={styles.plaintext} style={styles.dialogTitle} title={this.state.isLoading ? 'Finding your people' : 'You got three matches!'} />
          <View style={styles.dialogContentContainer}>
            {
              !this.state.isRematch && !this.state.isLoading &&
              <View>
                <View style={styles.leftImageContainer}>
                </View>

                <View style={styles.rightImageContainer}>
                </View>

                <View style={styles.middleImageContainer}>
                </View>

                <View style={styles.matchTitleContainer}>
                  <Text style={styles.matchTitle}>We found these people that are just like you, now go on. Make that move.</Text>
                </View>
              </View>
            }
            {
              this.state.isRematch && !this.state.isLoading &&
              <View>
                <View style={styles.leftImageContainer}>
                </View>

                <View style={styles.rightImageContainer}>
                </View>

                <View style={styles.middleImageContainer}>
                </View>

                <View style={styles.matchTitleContainer}>
                  <Text style={styles.matchTitle}>We found more people that are just like you. Time to socialize?</Text>
                </View>
              </View>
            }
            {
              this.state.isLoading &&
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color='rgba(63, 63, 191, 1)' />
              </View>
            }
          </View>
          </Dialog>
          </View>
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
