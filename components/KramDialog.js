import React from 'react';
import { Icon } from 'expo';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';
import Colors from '../constants/Colors';
import Dialog, { SlideAnimation, DialogContent, DialogTitle, DialogButton } from 'react-native-popup-dialog';
import { Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import { TextField } from 'react-native-material-textfield';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

export default class KramDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      recipients: [{ name: '', contact: '' }]
    }
    this.recipientsCount = 1;
  }

  componentWillMount() {
    if (Platform.OS === 'ios') {
        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow.bind(this));
        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide.bind(this));
    } else {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }
  }

  componentWillUnmount() {
      if (Platform.OS === 'ios') {
          this.keyboardWillShowListener.remove();
          this.keyboardWillHideListener.remove();
      } else {
          this.keyboardDidShowListener.remove();
          this.keyboardDidHideListener.remove();
      }
  }


  _keyboardWillShow(event) {

  }

  _keyboardWillHide(event) {
      this.scrollView.scrollTo({x: 0, y: 0, animated: true})
  }

  _keyboardDidShow(event) {

  }

  _keyboardDidHide(event) {
      this.scrollView.scrollTo({x: 0, y: 0, animated: true})
  }

  onChangeText = (field, value) => {
    this.setState({ [field]: value });
  }

  onChangeRecipants = (index, field, value) => {
    let newRecipients = [...this.state.recipients];
    newRecipients[index][field] = value;
    if (index+1 === this.state.recipients.length)
      newRecipients.push({ name: '', contact: '' });
    this.setState({ recipients: newRecipients });
  }

  onFocus = (value) => {
      this.scrollView.scrollTo({x: 0, y: value, animated: true})
  }

  renderKramView = () => {
    return (
      !this.props.isItemView && this.props.isKramView && !this.props.isPaymentSuccessView && !this.props.isLoading &&
      <ScrollView style={styles.kramView} ref={(ref) => this.scrollView = ref }>
        <KeyboardAvoidingView behavior="padding">
        <Text style={[styles.sectionText, { alignSelf: 'center', marginBottom: 20 }]}>Split evenly among the group</Text>
        <Text style={styles.sectionText}>Your group</Text>
        <View style={styles.textFieldRow}>
          <TextField
            label='Your Name'
            inputContainerStyle={styles.textField}
            labelTextStyle={styles.labelText}
            value={this.state.name}
            onFocus={ () => this.onFocus(80)}
            containerStyle={{ flex: 1, marginRight: 12 }}
            onChangeText={ (name) => this.onChangeText('name', name) }
          />
          <TextField
            label='Your Email'
            inputContainerStyle={styles.textField}
            labelTextStyle={styles.labelText}
            value={this.state.email}
            onFocus={ () => this.onFocus(80)}
            containerStyle={{ flex: 1 }}
            onChangeText={ (email) => this.onChangeText('email', email) }
          />
        </View>
        <Text style={styles.sectionText}>Invitees</Text>
        { this.renderRecipants() }
        <Text style={styles.sectionText}>Payment</Text>
        <Text style={styles.greysubtext}>{'You\'ll only pay for your share'}</Text>
        <View style={styles.creditCard}>
          <CreditCardInput
            labelStyle={{ fontFamily: 'Avenir' }}
            inputStyle={{ fontFamily: 'Avenir' }}
            allowScroll={true}
            onChange={this._onChange}
          />
        </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

  renderPaymentSuccessView = () => {
    return (
      !this.props.isItemView && !this.props.isKramView && this.props.isPaymentSuccessView && !this.props.isLoading &&
      <View style={styles.paymentSuccessView}>
        <View style={styles.bigIcon}>
          <Ionicons name="md-checkmark-circle" size={148} color="green" />
        </View>
        <Text style={styles.paymentSuccessTitle}>Payment Success</Text>
        <Text style={styles.paymentSuccessSubtitle}>Your invitees has been notified to make payment for their shares.</Text>
      </View>
    )
  }
  renderRecipants = () => {
    return this.state.recipients.map((item, i) => (
      <View style={styles.textFieldRow} key={i}>
        <TextField
          label='Name'
          inputContainerStyle={styles.textField}
          labelTextStyle={styles.labelText}
          value={item.name}
          containerStyle={{ flex: 1, marginRight: 12 }}
          onChangeText={ (name) => this.onChangeRecipants(i, 'name', name) }
        />
        <TextField
          label='Contact'
          inputContainerStyle={styles.textField}
          labelTextStyle={styles.labelText}
          value={item.contact}
          containerStyle={{ flex: 1 }}
          onChangeText={ (contact) => this.onChangeRecipants(i, 'contact', contact) }
        />
      </View>
    ))
  }

  renderLoader = () => {
    return (
      this.props.isLoading &&
      <View style={styles.loaderContainer}>
        <ActivityIndicator style={{ marginBottom: 20 }} size="large" color='rgba(63, 63, 191, 1)' />
        <Text style={styles.subtext}>Powered by KRAM</Text>
      </View>
    )
  }

  render() {
    return (
      <Dialog
        key={Object.keys(this.props)}
        visible={this.props.isOpenDialog}
        dialogAnimation={new SlideAnimation({
          slideFrom: 'bottom'
        })}
        actions={!this.props.isLoading ? [
          <DialogButton
            key={0}
            text="Checkout"
            onPress={this.props.toggleDialog}
          />,
          <DialogButton
            key={1}
            text={"KRAM"}
            onPress={() => { this.props.handleAction() }}
          />
        ] : []}
        width={WINDOW_WIDTH}
        height={WINDOW_HEIGHT}
        containerStyle={[{ flex: 1 }, Platform.OS === 'android' && { marginTop: Constants.statusBarHeight }]}
        onTouchOutside={this.props.toggleDialog}
      >
      <DialogTitle textStyle={styles.plaintext} style={styles.title} title={this.props.title} />
      {
        this.props.isItemView && !this.props.isKramView && !this.props.isPaymentSuccessView && !this.props.isLoading &&
        <ScrollView style={styles.content}>
            <View style={styles.image}>
              <Image
                   style={{ height: WINDOW_WIDTH/2 + 40, width: WINDOW_WIDTH }}
                   source={this.props.imageUrl}
                   resizeMode="cover"
              />
            </View>
              <View style={[styles.infoRow, { marginTop: 16 }]}>
                <View style={styles.icon}>
                  <Ionicons name="md-time" size={24.5} color="grey" />
                </View>
                <View>
                  <Text style={styles.greysubtext}>{this.props.time}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.icon}>
                  <Ionicons name="md-pricetag" size={24} color="grey" />
                </View>
                <View>
                  <Text style={styles.greysubtext}>{`$${this.props.price}`}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.icon}>
                  <Ionicons name="md-heart" size={24} color="grey" />
                </View>
                <View>
                  <Text style={styles.greysubtext}>{`${this.props.likes} Likes`}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.icon}>
                  <Ionicons name="md-cube" size={24} color="grey" />
                </View>
                <View>
                  <Text style={styles.greysubtext}>{this.props.condition}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.icon}>
                  <Ionicons name="md-grid" size={24} color="grey" />
                </View>
                <View>
                  <Text style={styles.greysubtext}>{this.props.type}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.icon}>
                  <Ionicons name="md-information-circle" size={24} color="grey" />
                </View>
                <View>
                  <Text style={styles.greysubtext}>{this.props.description}</Text>
                </View>
              </View>
          </ScrollView>
      }
      { this.renderKramView() }
      { this.renderPaymentSuccessView() }
      { this.renderLoader() }
      </Dialog>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    paddingTop: 25,
  },
  container: {
    flex: 1,
    marginBottom: 50
  },
  infoRow: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
  },
  plaintext: {
    fontFamily: 'Avenir',
    fontSize: 18,
    lineHeight: 25,
    fontWeight: '500'
  },
  sectionText: {
    fontFamily: 'Avenir',
    fontSize: 20,
    lineHeight: 25,
    marginBottom: 12
  },
  subtext: {
    fontFamily: 'Avenir',
    fontSize: 16,
    lineHeight: 25,
  },
  greysubtext: {
    fontFamily: 'Avenir',
    color: 'grey',
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 8
  },
  link: {
    fontFamily: 'Avenir',
    color: '#0099CC',
    fontSize: 16,
    lineHeight: 25,
    paddingLeft: 5,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 30,
    height: 30
  },
  bigIcon: {
    width: 148,
    height: 148,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textFieldRow: {
    flexDirection: 'row',
    marginBottom: 24
  },
  textField: {
    marginTop: -24,
    marginBottom: -16
  },
  labelText: {
    fontFamily: 'Avenir',
    color: 'rgba(63, 63, 191, 1)'
  },
  creditCard: {
    marginBottom: 96,
  },
  kramView: {
    flex: 1,
    padding: 24
  },
  paymentSuccessView: {
    flex: 1,
    padding: 24,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  paymentSuccessTitle: {
    fontFamily: 'Avenir',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
  },
  paymentSuccessSubtitle: {
    fontFamily: 'Avenir',
    fontSize: 16,
    color: 'grey',
    alignSelf: 'center',
    textAlign: 'center',
  }
});
