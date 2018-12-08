import React from 'react';
import { Icon } from 'expo';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default class Card extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.toggleModal}>
        <View style={styles.card}>
          <View style={styles.imageContainer}>
          </View>
          <View>
            <View>
              <Text style={styles.subtext}>{this.props.title}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: 30, height: 30}}>
                <Ionicons name="md-cash" size={24} color="grey" />
              </View>
              <View>
                <Text style={styles.price}>{`$${this.props.price}`}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    elevation: 3,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
        height: 1,
        width: 0
    },
    marginBottom: 10
  },
  title: {
    flex: 1,
    fontFamily: 'Avenir',
    fontSize: 16,
    lineHeight: 25,
    fontWeight: '700'
  },
  price: {
    alignItems: 'flex-start',
    flex: 1,
    fontFamily: 'Avenir',
    fontSize: 16,
    lineHeight: 25,
    fontWeight: '500',
    width: '100%',
  },
  imageContainer: {
    height: 50,
    width: 50,
    borderRadius: 100,
    marginRight: 12
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
});
