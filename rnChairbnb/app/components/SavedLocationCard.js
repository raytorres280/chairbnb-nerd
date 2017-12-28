import React, { Component } from 'react'
import { Text, ScrollView, View, StyleSheet, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import Search from './Search'
import LocationCard from './LocationCard'
import { fetchLocations } from '../reducers'
import store from '../store'

class SavedLocationCard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <TouchableHighlight onPress={() => console.log('testing')} style={styles.container}>
          <Text>saved loc</Text>
        </TouchableHighlight>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple'
  }
})

export default SavedLocationCard
